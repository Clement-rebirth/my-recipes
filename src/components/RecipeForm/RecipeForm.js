import React, { useEffect, useRef, useState } from 'react';

import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import Manager from '../../services/firebase/Manager';
import { slugify } from '../../services/slugify';
import { useHistory } from 'react-router';

const RecipeForm = ({ recipe }) => {

  const DEFAULT_DATA = {
    title: '',
    slug: '',
    imageName: false,
    category: 'none',
    ingredients: '',
    content: ''
  };

  const [categories, setCategories] = useState('loading');
  const [recipeFormData, setRecipeFormData] = useState(DEFAULT_DATA);

  useEffect(() => {
    // recipe is loading or we're not in edit mode
    if (!recipe || recipe === 'loading') return;

    setRecipeFormData({ 
      title: recipe.title,
      slug: recipe.slug,
      imageName: recipe.imageName,
      category: recipe.category,
      ingredients: recipe.ingredients,
      content: recipe.content
    });
  }, [recipe])
  
  let history = useHistory();
  let fileInputRef = useRef(null);

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

  const handleImageChange = e => {
    let file = fileInputRef.current.files[0];

    // if file size is more than 1mo
    if (file.size > 1024000) {
      alert(`L'image ne doit pas dépasser 1mo`);
      return;
    }

    const storage = getStorage();
    const recipeImagesFolderName = 'recipe-images';

    // if an image has already been uploaded
    if (recipeFormData.imageName) {
      const oldRecipeImageRef = ref(storage, `${recipeImagesFolderName}/${recipeFormData.imageName}`);

      deleteObject(oldRecipeImageRef)
        .then(() => setRecipeFormData({ ...recipeFormData, imageName: false }))
        .catch(error => console.error(error));
    }

    const recipeImageRef = ref(storage, `${recipeImagesFolderName}/${file.name}`);

    uploadBytes(recipeImageRef, file)
      .then(snapshot => {
        setRecipeFormData({ ...recipeFormData, imageName: snapshot.metadata.name })
      })
      .catch(error => {
        console.error(error);
        return;
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (recipeFormData.slug !== slugify(recipeFormData.slug)) {
      alert('Slug invalide');
      return;
    }
    
    if (recipe) {
      // update
      let recipeManager = new Manager(`recipes/${recipe.id}`);

      recipeManager
      .update(recipeFormData)
      .then(() => history.replace('/'));
    } else {
      // create
      let recipeManager = new Manager('recipes');

      recipeManager
        .add(recipeFormData)
        .then(() => history.replace('/'));
    }
  };

  return (
    <div className='recipe-form'>
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
          <input type='file' name='image' id='image' ref={fileInputRef} onChange={handleImageChange} />
        </div>

        { recipeFormData.imageName && 
          <div className='image-preview'>
            <img 
              src={`https://firebasestorage.googleapis.com/v0/b/my-recipes-5f5d6.appspot.com/o/recipe-images%2F${recipeFormData.imageName}?alt=media`}
              alt={recipeFormData.imageName} />
          </div>
        }

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
          <label htmlFor='content'>Préparation</label>
          <textarea name='content' id='content' required value={recipeFormData.content} onChange={handleChange} />
        </div>
        <button>{ recipe ? 'Modifier' : 'Créer' }</button>
      </form>
    </div>
  );
};

export default RecipeForm;
