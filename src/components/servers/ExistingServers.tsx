import { useEffect, useState } from "react";
import ListDisplay, { ListItem } from "../ListDisplay";
import { ServerEntity } from "../../models/SwaggerModels";

interface ExistingServersProps {
  servers: ServerEntity[];
  onSelection: (selectedServerDesc: string) => void;
}

export const ExistingServers = ({
  servers,
  onSelection,
}: ExistingServersProps) => {
  const [serverItems, setServerItems] = useState<ListItem[]>([]);

  useEffect(() => {
    if (servers.length > 0) {
      const mapped: ListItem[] = servers.map((item) => {
        const mappedElement = {
          name: item.description,
        } as ListItem;
        return mappedElement;
      });
      setServerItems(mapped);
    }
  }, [servers]);

  return (
    <ListDisplay
      title="Existing Servers"
      items={serverItems}
      onItemClick={(item) => onSelection(item.name)}
    />
  );
};
