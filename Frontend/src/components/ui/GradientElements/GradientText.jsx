export const GradientText = (props) => {
  return (
    // <h1
    //   class={`bg-gradient-to-b from-[${props.initialColor}] via-[${props.viaColor}] to-[${props.finalColor}] inline-block text-transparent bg-clip-text font-bebas uppercase font-semibold text-${props.size}`}
    // >
    //   {props.text}
    // </h1>
    <h1
      class={`bg-gradient-to-b from-[#00AF60] via-[#B1E9D5] to-[#00FFA3] inline-block text-transparent bg-clip-text font-bebas uppercase font-semibold text-${props.size}`}
    >
      {props.text}
    </h1>
  );
};
