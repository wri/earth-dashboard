define(["./when-208fe5b0","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./ComponentDatatype-9204e9f6","./FrustumGeometry-00e2e34e","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./Math-4e53b694","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1","./Plane-4aa8974d","./VertexFormat-e8cbf5b3"],(function(e,t,r,n,a,u,i,o,s,c,p,m,h){"use strict";function d(n){var a,i,o=n.frustum,s=n.orientation,c=n.origin;n=e.defaultValue(n._drawNearPlane,!0);o instanceof u.PerspectiveFrustum?(a=0,i=u.PerspectiveFrustum.packedLength):o instanceof u.OrthographicFrustum&&(a=1,i=u.OrthographicFrustum.packedLength),this._frustumType=a,this._frustum=o.clone(),this._origin=r.Cartesian3.clone(c),this._orientation=t.Quaternion.clone(s),this._drawNearPlane=n,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+i+r.Cartesian3.packedLength+t.Quaternion.packedLength}d.pack=function(n,a,i){i=e.defaultValue(i,0);var o=n._frustumType,s=n._frustum;return 0===(a[i++]=o)?(u.PerspectiveFrustum.pack(s,a,i),i+=u.PerspectiveFrustum.packedLength):(u.OrthographicFrustum.pack(s,a,i),i+=u.OrthographicFrustum.packedLength),r.Cartesian3.pack(n._origin,a,i),i+=r.Cartesian3.packedLength,t.Quaternion.pack(n._orientation,a,i),a[i+=t.Quaternion.packedLength]=n._drawNearPlane?1:0,a};var f=new u.PerspectiveFrustum,g=new u.OrthographicFrustum,_=new t.Quaternion,k=new r.Cartesian3;return d.unpack=function(n,a,i){a=e.defaultValue(a,0);var o,s=n[a++];0===s?(o=u.PerspectiveFrustum.unpack(n,a,f),a+=u.PerspectiveFrustum.packedLength):(o=u.OrthographicFrustum.unpack(n,a,g),a+=u.OrthographicFrustum.packedLength);var c=r.Cartesian3.unpack(n,a,k);a+=r.Cartesian3.packedLength;var p=t.Quaternion.unpack(n,a,_);n=1===n[a+=t.Quaternion.packedLength];return e.defined(i)?(a=s===i._frustumType?i._frustum:void 0,i._frustum=o.clone(a),i._frustumType=s,i._origin=r.Cartesian3.clone(c,i._origin),i._orientation=t.Quaternion.clone(p,i._orientation),i._drawNearPlane=n,i):new d({frustum:o,origin:c,orientation:p,_drawNearPlane:n})},d.createGeometry=function(e){var r=e._frustumType,n=e._frustum,s=e._origin,c=e._orientation,p=e._drawNearPlane;e=new Float64Array(24);u.FrustumGeometry._computeNearFarPlanes(s,c,r,n,e);n=new o.GeometryAttributes({position:new i.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e})});for(var m,h,d=p?2:1,f=new Uint16Array(8*(1+d)),g=p?0:1;g<2;++g)f[m=p?8*g:0]=h=4*g,f[m+1]=h+1,f[m+2]=h+1,f[m+3]=h+2,f[m+4]=h+2,f[m+5]=h+3,f[m+6]=h+3,f[m+7]=h;for(g=0;g<2;++g)f[m=8*(d+g)]=h=4*g,f[m+1]=h+4,f[m+2]=h+1,f[m+3]=h+5,f[m+4]=h+2,f[m+5]=h+6,f[m+6]=h+3,f[m+7]=h+7;return new i.Geometry({attributes:n,indices:f,primitiveType:i.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(e)})},function(t,r){return e.defined(r)&&(t=d.unpack(t,r)),d.createGeometry(t)}}));