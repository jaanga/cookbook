package org.papervision3d.objects.parsers.mocap
{
	import flash.events.TimerEvent;
	import flash.utils.Dictionary;
	import flash.utils.Timer;
	
	import org.ascollada.utils.StringUtil;
	import org.papervision3d.core.animation.channel.transform.MatrixChannel3D;
	import org.papervision3d.core.animation.curve.Curve3D;
	import org.papervision3d.core.animation.key.LinearCurveKey3D;
	import org.papervision3d.core.controller.AnimationController;
	import org.papervision3d.core.geom.renderables.Vertex3D;
	import org.papervision3d.core.math.Matrix3D;
	import org.papervision3d.core.proto.MaterialObject3D;
	import org.papervision3d.core.render.data.RenderSessionData;
	import org.papervision3d.events.FileLoadEvent;
	import org.papervision3d.materials.WireframeMaterial;
	import org.papervision3d.objects.DisplayObject3D;
	import org.papervision3d.objects.primitives.Sphere;

	/**
	 * The BVH class parses BVH motion capture files.
	 * 
	 * @see http://www.cs.wisc.edu/graphics/Courses/cs-838-1999/Jeff/BVH.html
	 * 
	 * @author timknip
	 */
	public class BVH extends DisplayObject3D
	{
		public static const DEFAULT_SAMPLE_RATE:Number = 0.033333;
		
		public var animation:AnimationController;
		public var bvhRoot:DisplayObject3D;
		public var sampleRate:Number;
		
		private var _channels:Dictionary;
		private var _channelInfo:Dictionary;
		private var _offsets:Dictionary;
		private var _frames:Array;
		private var _numFrames:uint;
		private var _currentFrame:uint;
		private var _timer:Timer;
		
		/**
		 * 
		 */ 
		public function BVH(name:String=null)
		{
			super(name);
			
			this.animation = new AnimationController();
		}
		
		/**
		 * 
		 */
		protected function createEndSite(name:String, material:MaterialObject3D=null):DisplayObject3D
		{
			return new DisplayObject3D(name);	
		} 
		
		/**
		 * 
		 */
		protected function createJoint(name:String, material:MaterialObject3D=null):DisplayObject3D
		{
			material = material || new WireframeMaterial(0xffff00);
			
			return new Sphere(material, 2, 3, 2, name);	
		} 
		
		/**
		 * 
		 */
		protected function createRoot(name:String, material:MaterialObject3D=null):DisplayObject3D
		{
			material = material || new WireframeMaterial(0xff0000);
			
			return new Sphere(material, 2, 3, 2, name);	
		} 
		
		/**
		 * Parses a BVH file.
		 * 
		 * @param data	The BVH file as a String
		 * @param async Whether to parse animation data async (enable when you get a timeout error).
		 */
		public function parse(data:String, async:Boolean=false):void 
		{
			var lines:Array = data.split("\n");
			var objects:Array = new Array();
			var parent:DisplayObject3D = this;
			var instance:DisplayObject3D;
			var parseAnimations:Boolean = false;
			var curOffset:int = 0;
			var line:String;
			var parts:Array;
			var cmd:String;
			var i:int, j:int;
			
			_frames = new Array();
			_offsets = new Dictionary();
			_channelInfo = new Dictionary();
			_channels = new Dictionary();
			
			sampleRate = DEFAULT_SAMPLE_RATE;
			
			for (i = 0; i < lines.length; i++) 
			{
				line = StringUtil.trim(lines[i]);
				parts = line.split(/\s+/);
				cmd = parts[0];
				
				switch (cmd) {
					case "HIERARCHY":
						break;
					
					case "ROOT":	
						this.bvhRoot = instance = createRoot(parts[1]);
						addChild(instance);
						break;
					
					case "JOINT":
						instance = createJoint(parts[1]);
						parent.addChild(instance);
						break;
					
					case "End":
						instance = createEndSite(parent.name+"_EndSite");
						parent.addChild(instance);
						break;
							
					case "OFFSET":
						var offset:Vertex3D = new Vertex3D();
						offset.x = parseFloat(parts[1]);
						offset.y = parseFloat(parts[2]);
						offset.z = parseFloat(parts[3]);
						_offsets[instance] = offset;
						break;
					
					case "CHANNELS":
						parts.shift();
						var info:ChannelInfo = new ChannelInfo(parts);
						var channel:MatrixChannel3D = new MatrixChannel3D(instance.transform);
						
						for (j = 0; j < 12; j++)
						{
							channel.addCurve(new Curve3D());	
						}
						
						_channelInfo[instance] = info;
						_channels[instance] = channel;
						
						info.offset = curOffset;
						curOffset += info.numChannels;
						break;
					
					case "{":
						objects.push(parent);
						parent = instance;
						break;
					
					case "}":
						parent = objects.pop() as DisplayObject3D;
						break;
					
					case "MOTION":
						parseAnimations = true; 
						break;
					
					case "Frames:":
						break;
									
					case "Frame":
						if (parts[1] == "Time:") 
						{
							sampleRate = parseFloat(parts[2]);
						}
						break;
							
					default:
						if (!isNaN(parseFloat(parts[0]))) 
						{
							var frameData:Array = new Array();
							for (j = 0; j < parts.length; j++) 
							{
								frameData.push(parseFloat(parts[j]));	
							}
							_frames.push(frameData);
						}
						break;			
				}
			}
			
			_numFrames = (_frames?_frames.length:0);
			_currentFrame = 0;
			
			// create the animation channels
			if (async)
			{
				_timer = new Timer(10, 1);
				_timer.addEventListener(TimerEvent.TIMER_COMPLETE, createNextChannel);
				_timer.start();
			}
			else
			{
				for (_currentFrame = 0; _currentFrame < _numFrames; _currentFrame++)
				{
					createAnimationChannels(this.bvhRoot, _currentFrame);
					dispatchEvent(new FileLoadEvent(FileLoadEvent.ANIMATIONS_PROGRESS, "", _currentFrame, _numFrames));
				}
				dispatchEvent(new FileLoadEvent(FileLoadEvent.LOAD_COMPLETE));
				dispatchEvent(new FileLoadEvent(FileLoadEvent.ANIMATIONS_COMPLETE));
			}
		}
		
		override public function project(parent:DisplayObject3D, renderSessionData:RenderSessionData):Number
		{
			if (animation)
			{
				animation.update();
			}
			
			return super.project(parent, renderSessionData);
		}
		
		/**
		 * Creates all animation curves for the specified object and its children.
		 * 
		 * @param object
		 * @param frame
		 */
		private function createAnimationChannels(object:DisplayObject3D, frame:int):void 
		{
			var child:DisplayObject3D;
			var offset:Vertex3D = _offsets[object];
			var tx:Number = 0, ty:Number = 0, tz:Number = 0;
			var rx:Number = 0, ry:Number = 0, rz:Number = 0;
			var channelInfo:ChannelInfo = _channelInfo[object];
			var channel:MatrixChannel3D = _channels[object];
			var frameData:Array = _frames[frame];
			var time:Number = sampleRate * frame;
			var dataPtr:int;
			var i:int, j:int;
			
			if (offset) {
				tx = offset.x;
				ty = offset.y;
				tz = offset.z;
			}
			
			if (channelInfo && channelInfo.channels) {
				dataPtr = channelInfo.offset;
				for (i = 0; i < channelInfo.channels.length; i++) {
					switch (channelInfo.channels[i]) {
						case "Xposition":
							tx = frameData[int(dataPtr+i)];
							break;
						case "Yposition":
							ty = frameData[int(dataPtr+i)];
							break;
						case "Zposition":
							tz = frameData[int(dataPtr+i)];
							break;
						case "Xrotation":
							rx = frameData[int(dataPtr+i)];
							break;
						case "Yrotation":
							ry = frameData[int(dataPtr+i)];
							break;
						case "Zrotation":
							rz = frameData[int(dataPtr+i)];
							break;
						default:
							break;
					}
				}
			}
			
			if (channel)
			{
				var matrix:Matrix3D = Matrix3D.IDENTITY;
				var toRadians:Number = Math.PI / 180
				var curve:Curve3D;
				
				matrix.calculateMultiply(matrix, Matrix3D.rotationMatrix(0, 1, 0, ry * toRadians));
				matrix.calculateMultiply(matrix, Matrix3D.rotationMatrix(1, 0, 0, rx * toRadians));
				matrix.calculateMultiply(matrix, Matrix3D.rotationMatrix(0, 0, 1, rz * toRadians));
				matrix.calculateMultiply(Matrix3D.translationMatrix(tx, ty, tz), matrix);
				
				var values:Array = [
					matrix.n11, matrix.n12, matrix.n13, matrix.n14,
					matrix.n21, matrix.n22, matrix.n23, matrix.n24,
					matrix.n31, matrix.n32, matrix.n33, matrix.n34
				];
				
				for (i = 0; i < 12; i++)
				{
					curve = channel.curves[i];
					curve.addKey(new LinearCurveKey3D(time, values[i]));
				}
				
				if (frame == _numFrames - 1)
				{
					channel.updateStartAndEndTime();
					this.animation.addChannel(channel);
				}
			}
			
			for each (child in object.children) 
			{
				createAnimationChannels(child, frame);
			}
		}
		
		/**
		 * 
		 */ 
		private function createNextChannel(e:TimerEvent):void
		{
			if (_currentFrame < _numFrames)
			{
				dispatchEvent(new FileLoadEvent(FileLoadEvent.ANIMATIONS_PROGRESS, "", _currentFrame, _numFrames));
				
				createAnimationChannels(this.bvhRoot, _currentFrame++);
				
				_timer.start();
			}
			else
			{
				dispatchEvent(new FileLoadEvent(FileLoadEvent.LOAD_COMPLETE));
				dispatchEvent(new FileLoadEvent(FileLoadEvent.ANIMATIONS_COMPLETE));
			}
		}
		
		/**
		 * Raw frame data.
		 */
		public function get frames():Array 
		{
			return _frames;
		}
		
		/**
		 * Total number of frames.
		 */
		public function get numFrames():int 
		{
			return _numFrames;
		}
	}
}

internal class ChannelInfo 
{
	public var numChannels:uint;
	public var offset:int;
	public var channels:Array;
	
	public function ChannelInfo(parts:Array):void 
	{
		this.numChannels = parseInt(parts.shift(), 10);
		this.channels = new Array();
		while (parts.length) 
		{
			this.channels.push(parts.shift());
		}
	}
}
