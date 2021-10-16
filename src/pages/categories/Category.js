import React, { useState } from 'react';
import Manager from '../../services/firebase/Manager';

const Category = ({ category }) => {

  const [showEditForm, setShowEditForm] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);

  const handleSubmit = e => {
    e.preventDefault();

    let categoryManager = new Manager(`categories/${category.id}`);
    categoryManager.set(categoryName, () => setShowEditForm(false));
  };

  if (showEditForm) return (
    <form className='category-edit-form' onSubmit={handleSubmit}>
      <input type='text' value={categoryName} onChange={e => setCategoryName(e.target.value)} />

      <div className='actions'>
        <button type='submit'>
          <span className='material-icons-round'>check</span>
        </button>
        <button className='close-category-form' type='button' onClick={() => setShowEditForm(false)}>
          <span className='material-icons-round'>close</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className='category'>
      <p>{ category.name }</p>

      <div className='actions'>
        <button className='edit-category' onClick={() => setShowEditForm(true)}>
          <span className='material-icons-round'>edit</span>
        </button>
        <button className='delete-list'>
          <span className='material-icons-round'>delete_outline</span>
        </button>
      </div>
    </div>
  );
}

export default Category;
