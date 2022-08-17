// import * as React from 'react';

// interface IUSeScrollPositionProps {
//   el: any;
// }

// const useScrollPosition = ({ el }: IUSeScrollPositionProps) => {
//   const [scrollPosition, setScrollPosition] = React.useState(0);

//   const handleScroll = () => {
//     const position = el.scrollTop;
//     console.log(position);
//     setScrollPosition(position);
//   };

//   React.useEffect(() => {
//     el.addEventListener('scroll', handleScroll);

//     return () => {
//       el.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return scrollPosition;
// };

// export default useScrollPosition;
