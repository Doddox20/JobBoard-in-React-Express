import React, { useState, useEffect } from "react";

function Admin() {
  const [advertisements, setAdvertisements] = useState([]);
  const [editingAdvertisement, setEditingAdvertisement] = useState(null);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch("http://localhost:3000/advertisement");
      const data = await response.json();
      console.log(data);
      setAdvertisements(data);
      
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  const handleEdit = (advertisement) => {
    setEditingAdvertisement({ ...advertisement });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/advertisement/id/${editingAdvertisement.data.data.idAd}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingAdvertisement),
        }
      );
      if (response.status === 200) {
        fetchAdvertisements();
        setEditingAdvertisement(null);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce :", error);
    }
  };

  const handleDelete = async (advertisementId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/advertisement/id/${advertisementId.data.data.idAd}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        fetchAdvertisements();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  return (
    <div>
      <h1>Tableau d'Administration - Annonces</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre de l'Annonce</th>
            <th>Date de Création</th>
            <th>Description</th>
            <th>Salaire</th>
            <th>Type de Contrat</th>
            <th>Ville</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {advertisements.map((advertisement) => (
            <tr key={advertisement.data.data.idAd}>
              <td>{advertisement.data.data.idAd}</td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <input
                    type="text"
                    value={editingAdvertisement.data.data.nomAd}
                    onChange={(e) =>
                      setEditingAdvertisement({ ...editingAdvertisement, data: { data: { ...editingAdvertisement.data.data, nomAd: e.target.value } } })
                    }
                  />
                ) : (
                  advertisement.data.data.nomAd
                )}
              </td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <input
                    type="text"
                    value={editingAdvertisement.data.data.dateCreationAd}
                    onChange={(e) =>
                      setEditingAdvertisement({ ...editingAdvertisement, data: { data: { ...editingAdvertisement.data.data, dateCreationAd: e.target.value } } })
                    }
                  />
                ) : (
                  advertisement.data.data.dateCreationAd
                )}
              </td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <textarea
                    value={editingAdvertisement.data.data.descriptionAd}
                    onChange={(e) =>
                      setEditingAdvertisement({ ...editingAdvertisement, data: { data: { ...editingAdvertisement.data.data, descriptionAd: e.target.value } } })
                    }
                  />
                ) : (
                  advertisement.data.data.descriptionAd
                )}
              </td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <input
                    type="text"
                    value={editingAdvertisement.data.data.salaireAd}
                    onChange={(e) =>
                      setEditingAdvertisement({ ...editingAdvertisement, data: { data: { ...editingAdvertisement.data.data, salaireAd: e.target.value } } })
                    }
                  />
                ) : (
                  advertisement.data.data.salaireAd
                )}
              </td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <input
                    type="text"
                    value={editingAdvertisement.data.data.typeAd}
                    onChange={(e) =>
                      setEditingAdvertisement({ ...editingAdvertisement, data: { data: { ...editingAdvertisement.data.data, typeAd: e.target.value } } })
                    }
                  />
                ) : (
                  advertisement.data.data.typeAd
                )}
              </td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <input
                    type="text"
                    value={editingAdvertisement.data.data.contractAd}
                    onChange={(e) =>
                      setEditingAdvertisement({ ...editingAdvertisement, data: { data: { ...editingAdvertisement.data.data, contractAd: e.target.value } } })
                    }
                  />
                ) : (
                  advertisement.data.data.contractAd
                )}
              </td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <input
                    type="text"
                    value={editingAdvertisement.data.data.VilleAd}
                    onChange={(e) =>
                      setEditingAdvertisement({ ...editingAdvertisement, data: { data: { ...editingAdvertisement.data.data, VilleAd: e.target.value } } })
                    }
                  />
                ) : (
                  advertisement.data.data.VilleAd
                )}
              </td>
              <td>
                {editingAdvertisement && editingAdvertisement.data.data.idAd === advertisement.data.data.idAd ? (
                  <button onClick={handleUpdate}>Enregistrer</button>
                ) : (
                  <button onClick={() => handleEdit(advertisement)}>Éditer</button>
                )}
                <button onClick={() => handleDelete(advertisement.data.data.idAd)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
