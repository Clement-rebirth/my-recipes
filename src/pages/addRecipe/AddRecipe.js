import React, { useEffect, useRef, useState } from 'react';

import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import Manager from '../../services/firebase/Manager';
import { slugify } from '../../services/slugify';

import './AddRecipe.scss';

const AddRecipe = () => {

  const [categories, setCategories] = useState('loading');
  const [recipeFormData, setRecipeFormData] = useState({
    title: '',
    slug: '',
    imageName: false,
    category: 'none',
    ingredients: '',
    content: ''
  });

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
          <input type='file' name='image' id='image' ref={fileInputRef} onChange={handleImageChange} />
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
