import React, { useState, useEffect } from "react";

function Admin() {
  const [advertisements, setAdvertisements] = useState([]);
  const [editingAdvertisement, setEditingAdvertisement] = useState(null);
  const [newAdvertisement, setNewAdvertisement] = useState({
    nomAd: "",
    dateCreationAd: "",
    descriptionAd: "",
    salaireAd: "",
    typeAd: "",
    contractAd: "",
    VilleAd: "",
    IdCom: ""
  });

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch("http://localhost:3000/advertisement");
      const data = await response.json();
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
      console.log("Tentative de suppression de l'annonce avec ID :", advertisementId);
      if (advertisementId) {
        console.log("Suppression en cours...");
        const response = await fetch(
          `http://localhost:3000/advertisement/id/${advertisementId}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 200) {
          console.log("Suppression réussie !");
          fetchAdvertisements();
        } else {
          console.log("La suppression a échoué. Réponse du serveur :", response);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  const handleCreateAdvertisement = async () => {
    try {
      // Vérifiez d'abord si idCom n'est pas vide
      if (!newAdvertisement.IdCom) {
        console.error("Le champ 'IdCom' ne peut pas être vide.");
        return; // Arrêtez la fonction ici
      }
  
      console.log("Nouvelle annonce à créer :", newAdvertisement); // Vérifiez les valeurs ici
  
      const response = await fetch("http://localhost:3000/advertisement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdvertisement),
      });
  
      if (response.status === 201) { // 201 Created
        fetchAdvertisements();
        // Réinitialiser le formulaire après la création
        setNewAdvertisement({
          nomAd: "",
          dateCreationAd: "",
          descriptionAd: "",
          salaireAd: "",
          typeAd: "",
          contractAd: "",
          VilleAd: "",
          IdCom: ""
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'annonce :", error);
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
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre de l'Annonce</th>
            <th>Date de Création</th>
            <th>Description</th>
            <th>Salaire</th>
            <th>Type de Contrat</th>
            <th>Ville</th>
            <th>Compagnie</th>
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
              <td>{advertisement?.Company?.name || ""}</td>
              <td>
                {editingAdvertisement?.idAd === advertisement?.idAd ? (
                  <button onClick={handleUpdate}>Enregistrer</button>
                ) : (
                  <button onClick={() => handleEdit(advertisement)}>Éditer</button>
                )}
                <button onClick={() => handleDelete(advertisement?.idAd)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Créer une nouvelle annonce</h2>
        <input
          type="text"
          placeholder="Titre de l'Annonce"
          value={newAdvertisement.nomAd}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, nomAd: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Date de Création "
          value={newAdvertisement.dateCreationAd}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, dateCreationAd: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newAdvertisement.descriptionAd}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, descriptionAd: e.target.value })}
        />
        <input
          type="text"
          placeholder="Salaire"
          value={newAdvertisement.salaireAd}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, salaireAd: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type de Contrat"
          value={newAdvertisement.typeAd}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, typeAd: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contrat"
          value={newAdvertisement.contractAd}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, contractAd: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ville"
          value={newAdvertisement.VilleAd}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, VilleAd: e.target.value })}
        />
        <input
          type="text"
          placeholder="ID de la Compagnie"
          value={newAdvertisement.IdCom}
          onChange={(e) => setNewAdvertisement({ ...newAdvertisement, IdCom: e.target.value })}
        />
        <button onClick={handleCreateAdvertisement}>Enregistrer la nouvelle annonce</button>
      </div>
    </div>
  );
}

export default Admin;
