
export let drawCircle = (ctx, weight, color, centerX, centerY, currentX, currentY) => {
    let r = Math.sqrt(Math.pow((centerX - currentX), 2) + Math.pow((centerY - currentY), 2));
    if (r <= weight) {
        return;
    }
    ctx.beginPath();
    ctx.lineWidth = weight;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = `${color}`;
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.stroke();
}

export let eraserCircle = (ctx, weight, centerX, centerY, currentX, currentY) => {
    ctx.beginPath();
    ctx.lineWidth = weight + 20;
    ctx.globalCompositeOperation = 'destination-out';
    let r = Math.sqrt(Math.pow((centerX - currentX), 2) + Math.pow((centerY - currentY), 2));
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.stroke();
}

export let circleTool = (mainCtx, tempCtx, weight, color, centerX, centerY, lastX, lastY, currentX, currentY, finishX, finishY) => {
    if (lastX && lastY) {
        if (finishX && finishY) {
            eraserCircle(tempCtx, weight, centerX, centerY, currentX, currentY);
            drawCircle(mainCtx, weight, color, centerX, centerY, finishX, finishY);
        } else {
            eraserCircle(tempCtx, weight, centerX, centerY, lastX, lastY);
            drawCircle(tempCtx, weight, color, centerX, centerY, currentX, currentY);
        }
    }
}

// ---------------------------------------------------------------------------

export let drawSquare = (ctx, weight, color, centerX, centerY, currentX, currentY) => {
    let widthSquare = currentX - centerX;
    let heightSquare = currentY - centerY;
    ctx.beginPath();
    ctx.lineWidth = weight;
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = `${color}`;
    ctx.rect(centerX, centerY, widthSquare, heightSquare);
    ctx.stroke();
}

export let eraserSquare = (ctx, weight, centerX, centerY, currentX, currentY) => {
    let widthSquare = currentX - centerX;
    let heightSquare = currentY - centerY;
    ctx.beginPath();
    ctx.lineWidth = weight;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.rect(centerX, centerY, widthSquare, heightSquare);
    ctx.stroke();
}

export let squareTool = (mainCtx, tempCtx, weight, color, centerX, centerY, lastX, lastY, currentX, currentY, finishX, finishY) => {
    if (lastX && lastY) {
        if (finishX && finishY) {
            eraserSquare(tempCtx, weight, centerX, centerY, currentX, currentY);
            drawSquare(mainCtx, weight, color, centerX, centerY, finishX, finishY);
        } else {
            eraserSquare(tempCtx, weight, centerX, centerY, lastX, lastY);
            drawSquare(tempCtx, weight, color, centerX, centerY, currentX, currentY);
        }
    }
}

