define(["exports","./arrayRemoveDuplicates-0f62a181","./Cartesian2-8417ca3d","./when-208fe5b0","./Math-4e53b694","./PolylinePipeline-28f5feec"],(function(e,i,t,r,a,n){"use strict";var o={},l=new t.Cartographic,s=new t.Cartographic;var h=new Array(2),g=new Array(2),p={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};o.computePositions=function(e,o,u,c,d,y){var f=function(e,n,o,h){var g=(n=i.arrayRemoveDuplicates(n,t.Cartesian3.equalsEpsilon)).length;if(!(g<2)){var p=r.defined(h),u=r.defined(o),c=new Array(g),d=new Array(g),y=new Array(g),f=n[0];c[0]=f;var v=e.cartesianToCartographic(f,l);u&&(v.height=o[0]),d[0]=v.height,y[0]=p?h[0]:0;for(var m,P,A=d[0]===y[0],C=1,w=1;w<g;++w){var b=n[w],M=e.cartesianToCartographic(b,s);u&&(M.height=o[w]),A=A&&0===M.height,m=v,P=M,a.CesiumMath.equalsEpsilon(m.latitude,P.latitude,a.CesiumMath.EPSILON10)&&a.CesiumMath.equalsEpsilon(m.longitude,P.longitude,a.CesiumMath.EPSILON10)?v.height<M.height&&(d[C-1]=M.height):(c[C]=b,d[C]=M.height,y[C]=p?h[w]:0,A=A&&d[C]===y[C],t.Cartographic.clone(M,v),++C)}if(!(A||C<2))return c.length=C,d.length=C,y.length=C,{positions:c,topHeights:d,bottomHeights:y}}}(e,o,u,c);if(r.defined(f)){o=f.positions,u=f.topHeights,c=f.bottomHeights;var v=o.length,m=(f=v-2,a.CesiumMath.chordLength(d,e.maximumRadius)),P=p;if(P.minDistance=m,P.ellipsoid=e,y){for(var A=0,C=0;C<v-1;C++)A+=n.PolylinePipeline.numberOfPoints(o[C],o[C+1],m)+1;var w=new Float64Array(3*A),b=new Float64Array(3*A),M=h,E=g;P.positions=M,P.height=E;var F=0;for(C=0;C<v-1;C++){M[0]=o[C],M[1]=o[C+1],E[0]=u[C],E[1]=u[C+1];var H=n.PolylinePipeline.generateArc(P);w.set(H,F),E[0]=c[C],E[1]=c[C+1],b.set(n.PolylinePipeline.generateArc(P),F),F+=H.length}}else P.positions=o,P.height=u,w=new Float64Array(n.PolylinePipeline.generateArc(P)),P.height=c,b=new Float64Array(n.PolylinePipeline.generateArc(P));return{bottomPositions:b,topPositions:w,numCorners:f}}},e.WallGeometryLibrary=o}));