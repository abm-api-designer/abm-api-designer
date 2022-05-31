export interface MenuSectionTitleProps {
  text: string;
}

export default function MenuSectionTitle({ text }: MenuSectionTitleProps) {
  return (
    <div
      style={{
        marginLeft: "8%",
        paddingTop: "1%",
        paddingBottom: "5%",
        color: "#1976d2",
      }}
    >
      {text}
    </div>
  );
}
