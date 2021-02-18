import React from "react";
import { UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: "d6f28492b786d1ee2fdc5296f4c21848.jpg",
    altText: "Slide 1",
    caption: "Slide 1",
    header: "Slide 1 Header",
    key: "1",
  },
  {
    src: "0de8d6ccb4865c8ac4f9a68233dfc01f.jpg",
    altText: "Slide 2",
    caption: "Slide 2",
    header: "Slide 2 Header",
    key: "2",
  },
  {
    src: "F_20200717120370mglkTt.jpg",
    altText: "Slide 3",
    caption: "Slide 3",
    header: "Slide 3 Header",
    key: "3",
  },
];

const Slide = () => <UncontrolledCarousel items={items} />;

export default Slide;
