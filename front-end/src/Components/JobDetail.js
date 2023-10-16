import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function JobDetail() {
    const { id } = useParams();
    const [jobDetail, setJobDetail] = useState(null);
    const [companyName, setCompanyName] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/advertisement/${id}`)
            .then(response => response.json())
            .then(data => setJobDetail(data))
            .catch(error => console.error('Erreur lors de la récupération des détails de l\'annonce:', error));
        }, [id]);

       useEffect(() => {

       if (jobDetail && jobDetail.data) {
        
        
           fetch(`http://localhost:3000/companie/${jobDetail.data.idCom}`)
               .then(response => response.json())
               .then(data => { 
                 setCompanyName(data.companyName);
                console.log("companyName inside useEffect:", data.data.nomCom);
            })

              .catch(error => console.error('Erreur lors de la récupération du nom de la compagnie :', error));
      }
          }, [jobDetail]);
         

     if (!jobDetail ) {
         return <div>Loading...</div>;
     }
    //    if (!companyName ) {
    //       return <div>Loading...</div>;
    //   }
    
    return (
        <div className="jobCard">
            <h1 className="text-center mb-5">{jobDetail.data.nomAd}</h1>
            <div className="row">
                <div className="col me-5 pe-5">
                    { <p><strong>Company:</strong> {companyName.data.data.nomCom}</p> }
                    <p><strong>Salary:</strong> {jobDetail.data.salaireAd}</p>
                    <p><strong>Contract:</strong> {jobDetail.data.contractAd}</p>
                </div>
                <div className="col ms-5 ps-5">
                    <p><strong>City:</strong> {jobDetail.data.VilleAd}</p>
                    <p><strong>Type:</strong> {jobDetail.data.typeAd}</p>
                    <p><strong>Date de publication:</strong> {jobDetail.data.dateCreationAd}</p>
                </div>
            </div>
            <p><strong>Description:</strong> {jobDetail.data.descriptionAd}</p>
        </div>
    );
}

export default JobDetail;
