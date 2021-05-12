define(["exports","./Cartesian2-8417ca3d","./Transforms-a73b3b3b","./EllipsoidTangentPlane-9123a53b","./Math-4e53b694","./PolylinePipeline-28f5feec"],(function(a,e,r,n,t,i){"use strict";var s=Object.freeze({ROUNDED:0,MITERED:1,BEVELED:2}),o=[new e.Cartesian3,new e.Cartesian3],l=new e.Cartesian3,C=new e.Cartesian3,c=new e.Cartesian3,u=new e.Cartesian3,y=new e.Cartesian3,m=new e.Cartesian3,d=new e.Cartesian3,f=new e.Cartesian3,p=new e.Cartesian3,g=new e.Cartesian3,w=new e.Cartesian3,h={},v=new e.Cartographic;function x(a,r,n,t){var i=a[0],s=(a=a[1],a=e.Cartesian3.angleBetween(i,a),Math.ceil(a/t)),o=new Array(s);if(r===n){for(C=0;C<s;C++)o[C]=r;return o.push(n),o}for(var l=(n-r)/s,C=1;C<s;C++)o[C]=r+C*l;return o[0]=r,o.push(n),o}var P=new e.Cartesian3,E=new e.Cartesian3,M=new e.Cartesian3(-1,0,0),T=new r.Matrix4,B=new r.Matrix4,b=new r.Matrix3,z=r.Matrix3.IDENTITY.clone(),S=new e.Cartesian3,A=new r.Cartesian4,D=new e.Cartesian3;function O(a,t,i,s,o,l,C,c){var u=S,y=A;T=r.Transforms.eastNorthUpToFixedFrame(a,o,T),u=r.Matrix4.multiplyByPointAsVector(T,M,u);u=u=e.Cartesian3.normalize(u,u),t=t,a=a,o=o,u=(o=new n.EllipsoidTangentPlane(a,o)).projectPointOntoPlane(e.Cartesian3.add(a,u,P),P),a=o.projectPointOntoPlane(e.Cartesian3.add(a,t,E),E),t=e.Cartesian2.angleBetween(u,a),t=0<=a.x*u.y-a.y*u.x?-t:t;b=r.Matrix3.fromRotationZ(t,b),D.z=l,T=r.Matrix4.multiplyTransformation(T,r.Matrix4.fromRotationTranslation(b,D,B),T);var m=z;m[0]=C;for(var d=0;d<c;d++)for(var f=0;f<i.length;f+=3)y=e.Cartesian3.fromArray(i,f,y),y=r.Matrix3.multiplyByVector(m,y,y),y=r.Matrix4.multiplyByPoint(T,y,y),s.push(y.x,y.y,y.z);return s}var N=new e.Cartesian3;function V(a,r,n,t,i,s,o){for(var l=0;l<a.length;l+=3)t=O(e.Cartesian3.fromArray(a,l,N),r,n,t,i,s[l/3],o,1);return t}function G(a,e){for(var r=a.length,n=new Array(3*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=0;o<r;o++)n[t++]=a[o].x-i,n[t++]=0,n[t++]=a[o].y-s;return n}var R=new r.Quaternion,I=new e.Cartesian3,L=new r.Matrix3;function j(a,n,i,o,l,C,c,u,y,m){var d,f=e.Cartesian3.angleBetween(e.Cartesian3.subtract(n,a,g),e.Cartesian3.subtract(i,a,w)),p=o===s.BEVELED?0:Math.ceil(f/t.CesiumMath.toRadians(5)),h=l?r.Matrix3.fromQuaternion(r.Quaternion.fromAxisAngle(e.Cartesian3.negate(a,g),f/(p+1),R),L):r.Matrix3.fromQuaternion(r.Quaternion.fromAxisAngle(a,f/(p+1),R),L);if(n=e.Cartesian3.clone(n,I),0<p)for(var v=m?2:1,x=0;x<p;x++)n=r.Matrix3.multiplyByVector(h,n,n),d=e.Cartesian3.subtract(n,a,g),d=e.Cartesian3.normalize(d,d),l||(d=e.Cartesian3.negate(d,d)),c=O(C.scaleToGeodeticSurface(n,w),d,u,c,C,y,1,v);else d=e.Cartesian3.subtract(n,a,g),d=e.Cartesian3.normalize(d,d),l||(d=e.Cartesian3.negate(d,d)),c=O(C.scaleToGeodeticSurface(n,w),d,u,c,C,y,1,1),i=e.Cartesian3.clone(i,I),d=e.Cartesian3.subtract(i,a,g),d=e.Cartesian3.normalize(d,d),l||(d=e.Cartesian3.negate(d,d)),c=O(C.scaleToGeodeticSurface(i,w),d,u,c,C,y,1,1);return c}h.removeDuplicatesFromShape=function(a){for(var r=a.length,n=[],t=r-1,i=0;i<r;t=i++){var s=a[t],o=a[i];e.Cartesian2.equals(s,o)||n.push(o)}return n},h.angleIsGreaterThanPi=function(a,r,t,i){return a=(i=new n.EllipsoidTangentPlane(t,i)).projectPointOntoPlane(e.Cartesian3.add(t,a,P),P),0<=(r=i.projectPointOntoPlane(e.Cartesian3.add(t,r,E),E)).x*a.y-r.y*a.x};var Q=new e.Cartesian3,F=new e.Cartesian3;h.computePositions=function(a,r,n,w,P){var E=w._ellipsoid,M=function(a,e){for(var r=new Array(a.length),n=0;n<a.length;n++){var t=a[n];v=e.cartesianToCartographic(t,v),r[n]=v.height,a[n]=e.scaleToGeodeticSurface(t,t)}return r}(a,E),T=w._granularity,B=w._cornerType,b=(P?function(a,e){var r=a.length,n=new Array(6*r),t=0,i=e.x+e.width/2,s=e.y+e.height/2,o=a[0];n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s;for(var l=1;l<r;l++){var C=(o=a[l]).x-i,c=o.y-s;n[t++]=C,n[t++]=0,n[t++]=c,n[t++]=C,n[t++]=0,n[t++]=c}return o=a[0],n[t++]=o.x-i,n[t++]=0,n[t++]=o.y-s,n}:G)(r,n),z=(r=P?G(r,n):void 0,n.height/2),S=n.width/2,A=a.length,D=[],N=(n=P?[]:void 0,l),R=C,I=c,L=y,U=m,_=d,q=f,Y=p,Z=a[0],k=a[1];$=E.geodeticSurfaceNormal(Z,$=u),N=e.Cartesian3.subtract(k,Z,N),N=e.Cartesian3.normalize(N,N),q=e.Cartesian3.cross($,N,q);q=e.Cartesian3.normalize(q,q);var H,J=M[0],K=M[1];P&&(n=O(Z,q,r,n,E,J+z,1,1)),Y=e.Cartesian3.clone(Z,Y),Z=k,R=e.Cartesian3.negate(N,R);for(var W=1;W<A-1;W++){var X=P?2:1;k=a[W+1],N=e.Cartesian3.subtract(k,Z,N);N=e.Cartesian3.normalize(N,N),I=e.Cartesian3.add(N,R,I),I=e.Cartesian3.normalize(I,I);var $=E.geodeticSurfaceNormal(Z,$),aa=e.Cartesian3.multiplyByScalar($,e.Cartesian3.dot(N,$),Q);e.Cartesian3.subtract(N,aa,aa),e.Cartesian3.normalize(aa,aa);var ea=e.Cartesian3.multiplyByScalar($,e.Cartesian3.dot(R,$),F);e.Cartesian3.subtract(R,ea,ea),e.Cartesian3.normalize(ea,ea),t.CesiumMath.equalsEpsilon(Math.abs(e.Cartesian3.dot(aa,ea)),1,t.CesiumMath.EPSILON7)?(D=O(Y,q,b,D,E,J+z,1,1),Y=Z):(I=e.Cartesian3.cross(I,$,I),I=e.Cartesian3.cross($,I,I),I=e.Cartesian3.normalize(I,I),aa=1/Math.max(.25,e.Cartesian3.magnitude(e.Cartesian3.cross(I,R,g))),(ea=h.angleIsGreaterThanPi(N,R,Z,E))?(L=e.Cartesian3.add(Z,e.Cartesian3.multiplyByScalar(I,aa*S,I),L),U=e.Cartesian3.add(L,e.Cartesian3.multiplyByScalar(q,S,U),U),o[0]=e.Cartesian3.clone(Y,o[0]),o[1]=e.Cartesian3.clone(U,o[1]),H=x(o,J+z,K+z,T),D=V(i.PolylinePipeline.generateArc({positions:o,granularity:T,ellipsoid:E}),q,b,D,E,H,1),q=e.Cartesian3.cross($,N,q),q=e.Cartesian3.normalize(q,q),_=e.Cartesian3.add(L,e.Cartesian3.multiplyByScalar(q,S,_),_),B===s.ROUNDED||B===s.BEVELED?j(L,U,_,B,ea,E,D,b,K+z,P):D=O(Z,I=e.Cartesian3.negate(I,I),b,D,E,K+z,aa,X)):(L=e.Cartesian3.add(Z,e.Cartesian3.multiplyByScalar(I,aa*S,I),L),U=e.Cartesian3.add(L,e.Cartesian3.multiplyByScalar(q,-S,U),U),o[0]=e.Cartesian3.clone(Y,o[0]),o[1]=e.Cartesian3.clone(U,o[1]),H=x(o,J+z,K+z,T),D=V(i.PolylinePipeline.generateArc({positions:o,granularity:T,ellipsoid:E}),q,b,D,E,H,1),q=e.Cartesian3.cross($,N,q),q=e.Cartesian3.normalize(q,q),_=e.Cartesian3.add(L,e.Cartesian3.multiplyByScalar(q,-S,_),_),B===s.ROUNDED||B===s.BEVELED?j(L,U,_,B,ea,E,D,b,K+z,P):D=O(Z,I,b,D,E,K+z,aa,X)),Y=e.Cartesian3.clone(_,Y),R=e.Cartesian3.negate(N,R)),J=K,K=M[W+1],Z=k}return o[0]=e.Cartesian3.clone(Y,o[0]),o[1]=e.Cartesian3.clone(Z,o[1]),H=x(o,J+z,K+z,T),D=V(i.PolylinePipeline.generateArc({positions:o,granularity:T,ellipsoid:E}),q,b,D,E,H,1),P&&(n=O(Z,q,r,n,E,K+z,1,1)),A=D.length,r=P?A+n.length:A,(r=new Float64Array(r)).set(D),P&&r.set(n,A),r},a.CornerType=s,a.PolylineVolumeGeometryLibrary=h}));