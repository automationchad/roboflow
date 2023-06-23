export default function (boxA, boxB) {
	const xA = Math.max(boxA.x, boxB.x);
	const yA = Math.max(boxA.y, boxB.y);
	const xB = Math.min(boxA.x + boxA.width, boxB.x + boxB.width);
	const yB = Math.min(boxA.y + boxA.height, boxB.y + boxB.height);
	const intersectionArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
	const boxAArea = boxA.area;
	const boxBArea = boxB.width * boxB.height;
	const iou = intersectionArea / (boxAArea + boxBArea - intersectionArea);
	return iou;
}
