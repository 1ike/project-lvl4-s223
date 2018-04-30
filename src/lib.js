const adjustElemHeight = (el) => {
  const elem = el;
  const scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight,
  );
  const diff = scrollHeight - window.innerHeight;

  const elInitHeight = elem.offsetHeight;
  const height = diff > 0 ? elInitHeight - diff : elInitHeight;
  elem.style.height = `${height}px`;
};

export default adjustElemHeight;
