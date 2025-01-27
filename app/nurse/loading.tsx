export default function Loading() {
  // Shared styles for scaling
  const mainStyle = {
    transform: 'scale(0.67)', // Scales the layout to 67%
    transformOrigin: 'top left', // Ensures scaling starts from the top-left corner
    width: '150%', // Compensates for scaling width
    height: '150%', // Compensates for scaling height
    overflow: 'hidden', // Prevents overflow due to scaling
  };

  return (
    <div
      style={mainStyle} // Apply the zoom-out effect here
      className="flex h-full w-screen items-center justify-center bg-background"
    >
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      ></div>
    </div>
  );
}
