import React, { useEffect, useState } from 'react';
import Manager from '../../services/firebase/Manager';

import Loading from '../../components/Loading/Loading';
import Category from './Category';

import './Categories.scss';

const Categories = () => {

  const [categories, setCategories] = useState('loading');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    let categoryManager = new Manager('categories');

    categoryManager.getAll(snapshot => {
      let data = snapshot.val();
      setCategories(data);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    
    let categoryManager = new Manager('categories');

    categoryManager
      .add(categoryName)
      .then(() => {
        alert(`La catégorie "${categoryName}" a bien été crée.`);
        setCategoryName('');
      });
  };

  if (categories === 'loading') return <Loading />

  return (
    <div className='categories container'>
      <h1>Catégories</h1>
      
      <div className='category-list'>
        {Object.keys(categories).map(key => (
          <Category key={key} category={{ name: categories[key], id: key }} />
        ))}
      </div>

      <div className='separator'></div>

      <div className='category-form'>
        <h2>Ajouter une catégorie</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Nom de la catégorie</label>
            <input
              type='text'
              id='name'
              required
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)} />
          </div>

          <button>Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default Categories;
