const TOP = 14;
const BOTTOM = 18;

/**
 * Draws one bar per day with the model probability, a dot above each day that was
 * really high, month ticks and a dashed line at the decision threshold.
 * Colors are read from the CSS tokens so the chart follows the theme.
 */
export function drawTimeline(canvas, { days, threshold, monthInitials }) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;

  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  const styles = getComputedStyle(document.documentElement);
  const color = (token) => styles.getPropertyValue(token).trim();
  const plotHeight = height - TOP - BOTTOM;
  const barWidth = width / days.length;

  // Month separators and initials
  ctx.font = '11px "IBM Plex Mono", monospace';
  let previousMonth = "";
  days.forEach(({ date }, i) => {
    const month = date.slice(5, 7);
    if (month === previousMonth) return;
    previousMonth = month;
    ctx.fillStyle = color("--color-border");
    ctx.fillRect(i * barWidth, TOP, 1, plotHeight);
    ctx.fillStyle = color("--color-text-muted");
    ctx.fillText(monthInitials[Number(month) - 1], i * barWidth, height - 4);
  });

  // Daily probability: solid when the model would raise an alert
  ctx.fillStyle = color("--color-accent");
  days.forEach(({ probability }, i) => {
    const barHeight = Math.max(1, probability * plotHeight);
    ctx.globalAlpha = probability >= threshold ? 1 : 0.3;
    ctx.fillRect(
      i * barWidth,
      TOP + plotHeight - barHeight,
      Math.max(1, barWidth - 0.4),
      barHeight,
    );
  });
  ctx.globalAlpha = 1;

  // Days that really exceeded the limit
  ctx.fillStyle = color("--color-signal");
  days.forEach(({ high }, i) => {
    if (!high) return;
    ctx.beginPath();
    ctx.arc(i * barWidth + barWidth / 2, TOP - 7, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Decision threshold
  const y = TOP + plotHeight - threshold * plotHeight;
  ctx.strokeStyle = color("--color-text");
  ctx.lineWidth = 1.2;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();
}
