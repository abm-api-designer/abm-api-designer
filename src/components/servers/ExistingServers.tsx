import { useState } from "react";
import ListDisplay from "../ListDisplay";

export const ExistingServers = () => {
  const [selectedServerDesc, setSelectedServerDesc] = useState<string>();
  return (
    <ListDisplay
      title="Existing Servers"
      items={[]}
      onItemClick={(item) => setSelectedServerDesc(item.name)}
    />
  );
};
