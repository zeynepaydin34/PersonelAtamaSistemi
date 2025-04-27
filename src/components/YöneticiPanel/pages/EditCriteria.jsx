import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './EditCriteria.css';

const EditCriteria = () => {
  const [criteria, setCriteria] = useState([]);  // Store criteria data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Handle any errors
  const [editing, setEditing] = useState(false); // Track edit mode
  const [editData, setEditData] = useState({
    kriter_id: null,
    kriter_ad: '',
    kadro_id: null,
    adet: 0,
  });  // Data for editing

  // Fetch criteria data from the backend
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/kriter');
        if (!response.ok) {
          throw new Error('Failed to fetch criteria');
        }
        const data = await response.json();
        setCriteria(data.criteria);
      } catch (err) {
        setError(err.message); // Set error message if fetching fails
        console.error('Error fetching criteria:', err);
      } finally {
        setLoading(false); // Data fetching is done
      }
    };

    fetchCriteria();
  }, []); // Run once on component mount

  // Calculate the total "adet" for a given "kriter_ad" and "kadro_id"
  const getAdetForKadro = (kriter_ad, kadro_id) => {
    return criteria
      .filter(item => item.kriter_ad === kriter_ad && item.kadro_id === kadro_id)
      .reduce((sum, item) => sum + (item.adet || 0), 0);
  };

  const kriterler = [...new Set(criteria.map(item => item.kriter_ad))]; // Get unique kriter_ad

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle the edit button click
  const handleEdit = (kriter_ad, kadro_id) => {
    // Find the criteria entry to edit
    const existingEntry = criteria.find(item => item.kriter_ad === kriter_ad && item.kadro_id === kadro_id);
    setEditData({
      kriter_id: existingEntry.kriter_id,
      kriter_ad,
      kadro_id,
      adet: existingEntry.adet || 0,
    });
    setEditing(true); // Show the edit form
  };

  // Handle form submission for editing
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    // Validate if all required fields are present
    if (editData.kriter_id == null || editData.kadro_id == null || editData.adet == null) {
      alert('Kriter ID, Kadro ID, ve Adet gereklidir.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/kriterDegistirme', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setCriteria((prevCriteria) =>
          prevCriteria.map((item) =>
            item.kriter_id === editData.kriter_id && item.kadro_id === editData.kadro_id
              ? { ...item, adet: editData.adet }
              : item
          )
        );
        setEditing(false); // Close the edit form
      } else {
        console.error('Failed to update criteria:', responseData.message);
        alert(`Error: ${responseData.message || 'Failed to update criteria.'}`);
      }
    } catch (err) {
      console.error('Error updating criteria:', err);
      alert('An error occurred while updating the criteria.');
    }
  };

  return (
    <div className="edit-criteria">
      <Sidebar />
      <h2>Kriter Düzenle</h2>
      <table className="criteria-table">
        <thead>
          <tr>
            <th>Kriterler</th>
            <th>Dr. Öğr. Üyesi</th>
            <th>Doçent</th>
            <th>Profesör</th>
            <th>Kriter Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {kriterler.map((kriter_ad) => (
            <tr key={kriter_ad}>
              <td>{kriter_ad}</td>
              <td>{getAdetForKadro(kriter_ad, 1)}</td> {/* Dr. Öğr. Üyesi */}
              <td>{getAdetForKadro(kriter_ad, 2)}</td> {/* Doçent */}
              <td>{getAdetForKadro(kriter_ad, 3)}</td> {/* Profesör */}
              <td className="action-buttons">
                <button onClick={() => handleEdit(kriter_ad, 1)}>Dr.</button>
                <button onClick={() => handleEdit(kriter_ad, 2)}>Doç.</button>
                <button onClick={() => handleEdit(kriter_ad, 3)}>Prof</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit form modal */}
      {editing && (
        <div className="edit-modal">
          <h3>
            {editData.kriter_ad} için {editData.kadro_id === 1 ? 'Dr. Öğr. Üyesi' : editData.kadro_id === 2 ? 'Doçent' : 'Profesör'} Düzenle
          </h3>
          <form onSubmit={handleSubmitEdit}>
            <label>Adet</label>
            <input
              type="number"
              value={editData.adet}
              onChange={(e) => setEditData({ ...editData, adet: Number(e.target.value) })}
              min="0"
              required
            />
            <button type="submit">Güncelle</button>
            <button type="button" onClick={() => setEditing(false)}>İptal</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCriteria;
