const CustomDetailTagToolBarButton = {
  name: "custom-details",
  action: (editor: any) => {
    const cm = editor.codemirror;
    const output = "<details>\n<summary>\nsummary\n</summary>\n\n\n</details>";
    const cursor = cm.getCursor();
    cm.replaceRange(output, cursor);
  },
  className: "fa fa-plus-square",
  title: "Insert Details",
};

export default CustomDetailTagToolBarButton;
