import { FC, useState, useEffect } from 'react';

import './style.css';

type ItemProps = {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: {
    name: string;
  }
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
        <button tabIndex={0} aria-label='button to fetch users' type="button" name="users" onClick={handleClick}>
          Fetch Users
        </button>
      </div>
      {items.map((item: ItemProps, index: number) => (
        <div tabIndex={index + 1} id={item.id.toString()} key={item.id} role='list' className="infoContainer">
            <label htmlFor="name">Name:</label><li id="name"> {item.name}</li>
            <label htmlFor="phone">Phone:</label><li id="phone"> {item.phone}</li>
            <label htmlFor="email">Email:</label><li id="email"> {item.email}</li>
            <label htmlFor="company">Company:</label><li id="company"> {item.company.name}</li>
        </div>
      ))}
    </>
  );
};
