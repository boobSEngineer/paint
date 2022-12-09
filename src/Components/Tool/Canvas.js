
export let clearCanvas = (canvas, ctx) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // setFill(false);
}

export let getCursorPosition = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / rect.width * canvas.width); // деление нужно для чтобы при уменьшении экрана, менялись координаты рисования
    const y = Math.floor((e.clientY - rect.top) / rect.height * canvas.height); //
    return {x: x, y: y};
}

export let saveImg = (canvas) => {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete();

}
