export let drawLine = (ctx, weight, color, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = weight;
    ctx.strokeStyle = `${color}`;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


export let pencilTool = (mainCtx, tempCtx, weight, color, centerX, centerY, lastX, lastY, currentX, currentY, finishX, finishY) => {
    if (lastX && lastY) {
        mainCtx.globalCompositeOperation = "source-over";
        drawLine(mainCtx, weight, color, lastX, lastY, currentX, currentY);
    }
}

export let eraserTool = (mainCtx, tempCtx, weight, color, centerX, centerY, lastX, lastY, currentX, currentY, finishX, finishY) => {
    if (lastX && lastY) {
        mainCtx.globalCompositeOperation = 'destination-out';
        drawLine(mainCtx, weight, color, lastX, lastY, currentX, currentY);
    }
}
