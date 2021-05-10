import {
	Appearance,
	ComponentDatatype,
	defined,
	Framebuffer,
	Geometry,
	GeometryAttributes,
	Math as MathCesium,
	Texture
} from 'cesium';

export const loadText = (filePath) => {
	const request = new XMLHttpRequest();
	request.open('GET', filePath, false);
	request.send();
	return request.responseText;
};

export const getFullscreenQuad = () => {
	const fullscreenQuad = new Geometry({
		attributes: new GeometryAttributes({
			position: new GeometryAttribute({
				componentDatatype: ComponentDatatype.FLOAT,
				componentsPerAttribute: 3,
				//  v3----v2
				//  |     |
				//  |     |
				//  v0----v1
				values: new Float32Array([
					-1, -1, 0, // v0
					1, -1, 0, // v1
					1, 1, 0, // v2
					-1, 1, 0, // v3
				])
			}),
			st: new GeometryAttribute({
				componentDatatype: ComponentDatatype.FLOAT,
				componentsPerAttribute: 2,
				values: new Float32Array([
					0, 0,
					1, 0,
					1, 1,
					0, 1,
				])
			})
		}),
		indices: new Uint32Array([3, 2, 0, 0, 2, 1])
	});
	return fullscreenQuad;
}

export const createTexture = (options, typedArray) => {
	if (defined(typedArray)) {
		// typed array needs to be passed as source option, this is required by Cesium.Texture
		const source = {};
		source.arrayBufferView = typedArray;
		options.source = source;
	}

	const texture = new Texture(options);
	return texture;
}

export const createFramebuffer = (context, colorTexture, depthTexture) => {
	const framebuffer = new Framebuffer({
		context: context,
		colorTextures: [colorTexture],
		depthTexture: depthTexture
	});
	return framebuffer;
}

export const createRawRenderState = (options) => {
	const translucent = true;
	const closed = false;
	const existing = {
		viewport: options.viewport,
		depthTest: options.depthTest,
		depthMask: options.depthMask,
		blending: options.blending
	};

	const rawRenderState = Appearance.getDefaultRenderState(translucent, closed, existing);
	return rawRenderState;
}

export const viewRectangleToLonLatRange = (viewRectangle) => {
	let range = {};

	let postiveWest = MathCesium.mod(viewRectangle.west, MathCesium.TWO_PI);
	let postiveEast = MathCesium.mod(viewRectangle.east, MathCesium.TWO_PI);
	let width = viewRectangle.width;

	let longitudeMin;
	let longitudeMax;
	if (width > MathCesium.THREE_PI_OVER_TWO) {
		longitudeMin = 0.0;
		longitudeMax = MathCesium.TWO_PI;
	} else {
		if (postiveEast - postiveWest < width) {
			longitudeMin = postiveWest;
			longitudeMax = postiveWest + width;
		} else {
			longitudeMin = postiveWest;
			longitudeMax = postiveEast;
		}
	}

	range.lon = {
		min: MathCesium.toDegrees(longitudeMin),
		max: MathCesium.toDegrees(longitudeMax)
	}

	let south = viewRectangle.south;
	let north = viewRectangle.north;
	let height = viewRectangle.height;

	let extendHeight = height > MathCesium.PI / 12 ? height / 2 : 0;
	let extendedSouth = MathCesium.clampToLatitudeRange(south - extendHeight);
	let extendedNorth = MathCesium.clampToLatitudeRange(north + extendHeight);

	// extend the bound in high latitude area to make sure it can cover all the visible area
	if (extendedSouth < -MathCesium.PI_OVER_THREE) {
		extendedSouth = -MathCesium.PI_OVER_TWO;
	}
	if (extendedNorth > MathCesium.PI_OVER_THREE) {
		extendedNorth = MathCesium.PI_OVER_TWO;
	}

	range.lat = {
		min: MathCesium.toDegrees(extendedSouth),
		max: MathCesium.toDegrees(extendedNorth)
	}

	return range;
}

export const FILE_OPTIONS = {
	dataDirectory: '/data/',
	dataFile: "demo.nc",
	glslDirectory: '../glsl/'
};
