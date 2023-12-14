import { FC, useState, useEffect } from 'react';

import './style.css';

type ItemProps = {
  id: number;
  title?: string;
  name?: string;
};
export const App: FC = () => {
  const [resource, setResourceType] = useState('');
  const [items, setItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resource}`)
      .then((response) => response.json())
      .then((json) => setItems(json));

    return () => {};
  }, [resource]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    setResourceType(e.currentTarget.name || '');
  };

  return (
    <>
      <div>
        <button type="button" name="posts" onClick={handleClick}>
          Posts
        </button>
        <button type="button" name="users" onClick={handleClick}>
          Users
        </button>
      </div>
      {items.map((item: ItemProps) => (
        <ul>
          <li>Id: {item.id}</li>
          {item.title && <li>Title : {item.title}</li>}
          {item.name && <li>Name: {item.name}</li>}
        </ul>
      ))}
    </>
  );
};
