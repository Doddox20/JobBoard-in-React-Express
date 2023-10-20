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
      if (editingAdvertisement?.idAd) {
        const response = await fetch(
          `http://localhost:3000/advertisement/id/${editingAdvertisement.idAd}`,
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
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'annonce :", error);
    }
  };

  const handleDelete = async (advertisementId) => {
    try {
      if (advertisementId?.idAd) {
        const response = await fetch(
          `http://localhost:3000/advertisement/id/${advertisementId.idAd}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 200) {
          fetchAdvertisements();
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  const handleCellEdit = (e, field) => {
    const newValue = e.target.innerText;
    setEditingAdvertisement((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  return (
    <div className="container">
      <h1 className="mt-4">Tableau d'Administration - Annonces</h1>
      <table className="table mt-3">
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
          {advertisements?.data?.map((advertisement) => (
            <tr key={advertisement?.idAd}>
              <td>{advertisement?.idAd || ""}</td>
              <td
                contentEditable={editingAdvertisement?.idAd === advertisement?.idAd}
                onInput={(e) => handleCellEdit(e, "nomAd")}
              >
                {advertisement?.nomAd || ""}
              </td>
              <td
                contentEditable={editingAdvertisement?.idAd === advertisement?.idAd}
                onInput={(e) => handleCellEdit(e, "dateCreationAd")}
              >
                {advertisement?.dateCreationAd || ""}
              </td>
              <td
                contentEditable={editingAdvertisement?.idAd === advertisement?.idAd}
                onInput={(e) => handleCellEdit(e, "descriptionAd")}
              >
                {advertisement?.descriptionAd || ""}
              </td>
              <td
                contentEditable={editingAdvertisement?.idAd === advertisement?.idAd}
                onInput={(e) => handleCellEdit(e, "salaireAd")}
              >
                {advertisement?.salaireAd || ""}
              </td>
              <td
                contentEditable={editingAdvertisement?.idAd === advertisement?.idAd}
                onInput={(e) => handleCellEdit(e, "typeAd")}
              >
                {advertisement?.typeAd || ""}
              </td>
              <td
                contentEditable={editingAdvertisement?.idAd === advertisement?.idAd}
                onInput={(e) => handleCellEdit(e, "contractAd")}
              >
                {advertisement?.contractAd || ""}
              </td>
              <td
                contentEditable={editingAdvertisement?.idAd === advertisement?.idAd}
                onInput={(e) => handleCellEdit(e, "VilleAd")}
              >
                {advertisement?.VilleAd || ""}
              </td>
              <td>
                {editingAdvertisement?.idAd === advertisement?.idAd ? (
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Enregistrer
                  </button>
                ) : (
                  <button className="btn btn-info" onClick={() => handleEdit(advertisement)}>
                    Éditer
                  </button>
                )}
                <button className="btn btn-danger" onClick={() => handleDelete(advertisement?.idAd)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;