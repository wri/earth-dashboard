define(["./GeometryOffsetAttribute-def3b741","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./ComponentDatatype-9204e9f6","./CylinderGeometryLibrary-daf6cec5","./when-208fe5b0","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6","./Math-4e53b694","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1"],(function(t,e,i,r,a,n,o,u,s,f,d,b,l){"use strict";var m=new i.Cartesian2;function c(t){var e=(t=o.defaultValue(t,o.defaultValue.EMPTY_OBJECT)).length,i=t.topRadius,r=t.bottomRadius,a=o.defaultValue(t.slices,128),n=Math.max(o.defaultValue(t.numberOfVerticalLines,16),0);this._length=e,this._topRadius=i,this._bottomRadius=r,this._slices=a,this._numberOfVerticalLines=n,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}c.packedLength=6,c.pack=function(t,e,i){return i=o.defaultValue(i,0),e[i++]=t._length,e[i++]=t._topRadius,e[i++]=t._bottomRadius,e[i++]=t._slices,e[i++]=t._numberOfVerticalLines,e[i]=o.defaultValue(t._offsetAttribute,-1),e};var p={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return c.unpack=function(t,e,i){e=o.defaultValue(e,0);var r=t[e++],a=t[e++],n=t[e++],u=t[e++],s=t[e++];e=t[e];return o.defined(i)?(i._length=r,i._topRadius=a,i._bottomRadius=n,i._slices=u,i._numberOfVerticalLines=s,i._offsetAttribute=-1===e?void 0:e,i):(p.length=r,p.topRadius=a,p.bottomRadius=n,p.slices=u,p.numberOfVerticalLines=s,p.offsetAttribute=-1===e?void 0:e,new c(p))},c.createGeometry=function(r){var d=r._length,b=r._topRadius,l=r._bottomRadius,c=r._slices,p=r._numberOfVerticalLines;if(!(d<=0||b<0||l<0||0===b&&0===l)){var y,_,h=2*c,A=n.CylinderGeometryLibrary.computePositions(d,b,l,c,!1),v=2*c;0<p&&(y=Math.min(p,c),_=Math.round(c/y),v+=y);for(var R=f.IndexDatatype.createTypedArray(h,2*v),G=0,O=0;O<c-1;O++)R[G++]=O,R[G++]=O+1,R[G++]=O+c,R[G++]=O+1+c;if(R[G++]=c-1,R[G++]=0,R[G++]=c+c-1,R[G++]=c,0<p)for(O=0;O<c;O+=_)R[G++]=O,R[G++]=O+c;return(p=new s.GeometryAttributes).position=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:A}),m.x=.5*d,m.y=Math.max(l,b),b=new e.BoundingSphere(i.Cartesian3.ZERO,i.Cartesian2.magnitude(m)),o.defined(r._offsetAttribute)&&(d=A.length,A=new Uint8Array(d/3),d=r._offsetAttribute===t.GeometryOffsetAttribute.NONE?0:1,t.arrayFill(A,d),p.applyOffset=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:A})),new u.Geometry({attributes:p,indices:R,primitiveType:u.PrimitiveType.LINES,boundingSphere:b,offsetAttribute:r._offsetAttribute})}},function(t,e){return o.defined(e)&&(t=c.unpack(t,e)),c.createGeometry(t)}}));