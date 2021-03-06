const gestures = {
	cheer: {
		name: "gestureCheer",
		algorithm: "fingerpose",
		models: "hands",
		tags: ["gestureDemo"],
		confidence: "7.5",
		description: [
			["addCurl", "Thumb", "NoCurl", 1],
			["addCurl", "Thumb", "HalfCurl", 0.5789473684210527],
			["addDirection", "Thumb", "DiagonalUpRight", 1],
			["addDirection", "Thumb", "VerticalUp", 0.42857142857142855],
			["addCurl", "Index", "NoCurl", 1],
			["addDirection", "Index", "VerticalUp", 0.875],
			["addDirection", "Index", "DiagonalUpLeft", 1],
			["addCurl", "Middle", "NoCurl", 1],
			["addDirection", "Middle", "VerticalUp", 1],
			["addDirection", "Middle", "DiagonalUpRight", 0.36363636363636365],
			["addCurl", "Ring", "FullCurl", 1],
			["addDirection", "Ring", "DiagonalUpRight", 0.5789473684210527],
			["addDirection", "Ring", "VerticalUp", 1],
			["addCurl", "Pinky", "FullCurl", 1],
			["addDirection", "Pinky", "DiagonalUpRight", 0.6666666666666666],
			["addDirection", "Pinky", "VerticalUp", 1],
			["setWeight", "Index", 2],
			["setWeight", "Middle", 2],
		],
	},
};

handsfree = new Handsfree({
	isClient: true,
	hands: true,
	// weboji: true
});
handsfree.enablePlugins("browser");

//enable gestures
handsfree.useGesture(gestures["cheer"]);
handsfree.enableGestures("gestureDemo");

/**
 * Pinch Click
 */
handsfree.use("pinchClick", ({ hands }) => {
	if (!hands.multiHandLandmarks) return;

	hands.pointer.forEach((pointer, hand) => {
		if (pointer.isVisible && hands.pinchState[hand][0] === "start") {
			document.addEventListener("keydown", function (event) {
				console.log(event);
			});
			var evt = new KeyboardEvent("keydown", { keyCode: 32, which: 32 });
			document.dispatchEvent(evt);
		}
	});
});

/**
 * Handle messages from background script
 */
chrome.runtime.onMessage.addListener(function (message) {
	switch (message.action) {
		case "handsfree-data":
			handsfree.runPlugins(message.data);
			break;

		case "handsfree-debug":
			console.log(message.data);
			break;
	}
});
