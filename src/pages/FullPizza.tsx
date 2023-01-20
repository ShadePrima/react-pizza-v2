import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://62cc78498042b16aa7cff6cc.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert('Error while getting pizza');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='Pizza' />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
