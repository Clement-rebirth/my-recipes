import React, { useEffect, useState } from 'react';

import Manager from '../../services/firebase/Manager';
import { slugify } from '../../services/slugify';

import './AddRecipe.scss';

const AddRecipe = () => {

  const [categories, setCategories] = useState('loading');
  const [recipeFormData, setRecipeFormData] = useState({
    title: '',
    slug: '',
    category: 'none',
    ingredients: '',
    content: ''
  });

  useEffect(() => {
    let categoryManager = new Manager('categories');

    categoryManager.getAll(snapshot => {
      let data = snapshot.val();
      setCategories(data);
    });
  }, []);

  const handleChange = e => {
    const { value, name } = e.target;
    setRecipeFormData({ ...recipeFormData, [name]: value });
  };

  const handleTitleChange = e => {
    let value = e.target.value;
    setRecipeFormData({ 
      ...recipeFormData,
      title: value,
      slug: slugify(value)
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (recipeFormData.slug !== slugify(recipeFormData.slug)) {
      alert('Slug invalide');
      return;
    }

    let recipeManager = new Manager('recipes');
    recipeManager.add(recipeFormData);
  };

  return (
    <div className='add-recipe container'>
      <h1>Ajouter une recette</h1>

      <form id='add-recipe' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Titre</label>
          <input
            id='title'
            name='title'
            type='text'
            required
            placeholder='Ma super recette'
            value={recipeFormData.title}
            onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor='slug'>Slug</label>
          <input type='text' name='slug' id='slug' required value={recipeFormData.slug} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='image'>Sélectionner une image pour la recette</label>
          <input type='file' name='image' id='image' />
        </div>
        <div>
          <label htmlFor='category'>Choisissez une catégorie</label>
          <select name='category' id='category' required value={recipeFormData.category} onChange={handleChange}>
            <option value='none'>Aucune</option>
            {Object.keys(categories).map(key => (
              <option key={key} value={key}>{ categories[key] }</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='ingredients'>Ingrédients</label>
          <textarea name='ingredients' id='ingredients' required value={recipeFormData.ingredients} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='content' value={recipeFormData.content}>Recette</label>
          <textarea name='content' id='content' required onChange={handleChange} />
        </div>
        <button>Créer</button>
      </form>
    </div>
  );
};

export default AddRecipe;
