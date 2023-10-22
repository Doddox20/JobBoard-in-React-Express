import chai from "chai";
import {
  getAllAdvertissment,
  getAdvertisementById,
  getAdvertisementByCom,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} from "./Advertisement.js";

import {
  getCompanieByAd,
  getAllCompanie,
  getCompanieById,
  createCompanie,
  updateCompanie,
  deleteCompanie,
} from "./Companies.js";
import { format } from "date-fns";

const expect = chai.expect;

describe("Advertisement Controller", () => {
  it("Recuperer toutes les annonces", async () => {
    const req = {};
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(200);
        return {
          json: (data) => {
            expect(data).to.have.property("data");
          },
        };
      },
    };

    await getAllAdvertissment(req, res);
  });

  it("Recuperer une annonce grace à son ID", async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Annonce non trouvée");
            },
          };
        }
      },
    };
  
    await getAdvertisementById(req, res);
  });

  it("Recuperer une annonce grace à son ID inexistant", async () => {
    const req = {
      params: {
        id: 58,
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Annonce non trouvée");
            },
          };
        }
      },
    };
  
    await getAdvertisementById(req, res);
  });

  it("Recuperer une annonce grace à sa companie ", async () => {
    const req = {
      params: {
        idCom: 1, 
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Annonce non trouvée");
            },
          };
        }
      },
    };

    await getAdvertisementByCom(req, res);
  });

  it("Recuperer une annonce grace à sa companie inexistante ", async () => {
    const req = {
      params: {
        idCom: 58, 
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Annonces non trouvées");
            },
          };
        }
      },
    };

    await getAdvertisementByCom(req, res);
  });

    it("Creer une annonce avec une date sous un mauvais format", async () => {
      const req = {
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "22 janvier 2023",
          descriptionAd: "Wow",
          salaireAd: 50000,
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 1,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 201) {
            expect(statusCode).to.equal(201);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Création de l'annonce échouée");
              },
            };
          }
        },
      };

      await createAdvertisement(req, res);
    });

    it("Creer une annonce ", async () => {
      const req = {
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "2023-10-22",
          descriptionAd: "Wow",
          salaireAd: 50000,
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 1,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 201) {
            expect(statusCode).to.equal(201);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Création de l'annonce échouée");
              },
            };
          }
        },
      };

      await createAdvertisement(req, res);
    });

    it("Creer une annonce avec un salaire en lettre", async () => {
      const req = {
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "2023-10-22",
          descriptionAd: "Wow",
          salaireAd: "Beaucoup d'argent",
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 1,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 201) {
            expect(statusCode).to.equal(201);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Création de l'annonce échouée");
              },
            };
          }
        },
      };

      await createAdvertisement(req, res);
    });

    
    it("Creer une annonce avec une companie inexistante", async () => {
      const req = {
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "2023-10-22",
          descriptionAd: "Wow",
          salaireAd: 50000,
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 58,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 201) {
            expect(statusCode).to.equal(201);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Création de l'annonce échouée");
              },
            };
          }
        },
      };

      await createAdvertisement(req, res);
    });

    

    it("Mettre a jour une annonce", async () => {
      const req = {
        params: {
          id: 1, 
        },
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "2023-10-22",
          descriptionAd: "Wow",
          salaireAd: 50000,
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 58,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de l'annonce échouée");
              },
            };
          }
        },
      };

      await updateAdvertisement(req, res);
    });

    it("Mettre a jour une annonce avec un id inexistant", async () => {
      const req = {
        params: {
          id: 58, 
        },
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "2023-10-22",
          descriptionAd: "Wow",
          salaireAd: 50000,
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 1,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de l'annonce échouée");
              },
            };
          }
        },
      };

      await updateAdvertisement(req, res);
    });

    it("Mettre a jour une annonce avec un mauvais format de date", async () => {
      const req = {
        params: {
          id: 1, 
        },
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "janvier",
          descriptionAd: "Wow",
          salaireAd: 50000,
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 1,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de l'annonce échouée");
              },
            };
          }
        },
      };

      await updateAdvertisement(req, res);
    });

    it("Mettre a jour une annonce avec un mauvais format pour le salaire", async () => {
      const req = {
        params: {
          id: 1, 
        },
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "2023-10-22",
          descriptionAd: "Wow",
          salaireAd: "Beaucoup",
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 1,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de l'annonce échouée");
              },
            };
          }
        },
      };

      await updateAdvertisement(req, res);
    });

    it("Mettre a jour une annonce avec un id de companie inexistant", async () => {
      const req = {
        params: {
          id: 1, 
        },
        body: {
          nomAd: "Super Dev",
          dateCreationAd: "2023-10-22",
          descriptionAd: "Wow",
          salaireAd: 50000,
          typeAd: "CDI",
          contractAd: "Temps plein",
          VilleAd: "Paris",
          IdCom: 58,
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de l'annonce échouée");
              },
            };
          }
        },
      };

      await updateAdvertisement(req, res);
    });

    it("Supprimer une annonce", async () => {
      const req = {
        params: {
          id: 1, 
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Suppression de l'annonce échouée");
              },
            };
          }
        },
      };

      await deleteAdvertisement(req, res);
    });
    it("Supprimer une annonce avec un id qui n'existe pas", async () => {
      const req = {
        params: {
          id: 58, 
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Suppression de l'annonce échouée");
              },
            };
          }
        },
      };

      await deleteAdvertisement(req, res);
    });
});

describe("Companie Controller", () => {
  it("Recuperer toutes les companies", async () => {
    const req = {};
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(200);
        return {
          json: (data) => {
            expect(data).to.have.property("data");
          },
        };
      },
    };

    await getAllCompanie(req, res);
  });

  it("Recuperer une companie grace à son ID", async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Annonce non trouvée");
            },
          };
        }
      },
    };
  
    await getCompanieById(req, res);
  });

  it("Recuperer une companie grace à son ID inexistant", async () => {
    const req = {
      params: {
        id: 58,
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Companie non trouvée");
            },
          };
        }
      },
    };
  
    await getCompanieById(req, res);
  });

  it("Recuperer une companie grace à une annonce ", async () => {
    const req = {
      params: {
        idCom: 1, 
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Companie non trouvée");
            },
          };
        }
      },
    };

    await getCompanieByAd(req, res);
  });

  it("Recuperer une companie grace à une annonce inexistante ", async () => {
    const req = {
      params: {
        idCom: 58, 
      },
    };
    const res = {
      status: (statusCode) => {
        if (statusCode === 200) {
          expect(statusCode).to.equal(200);
          return {
            json: (data) => {
              expect(data).to.have.property("data");
            },
          };
        } else if (statusCode === 404) {
          expect(statusCode).to.equal(404);
          return {
            json: (data) => {
              expect(data).to.have.property("message", "Companie non trouvée");
            },
          };
        }
      },
    };

    await getCompanieByAd(req, res);
  });

    it("Creer une companie", async () => {
      const req = {
        body: {
          nomCom: "Ubibi",
          descriptionCom: "super entreprise",
          addressCom: "14 rue ",
          villeCom: "sauvian",
          nbEmployeeCom: 20,
          mailCom: "ddzed@dede.fr",
          passCom: "cacaouettes",
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 201) {
            expect(statusCode).to.equal(201);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Création de la companie échouée");
              },
            };
          }
        },
      };

      await createCompanie(req, res);
    });

    it("Creer une companie avec un nombre d'employé au mauvais format", async () => {
      const req = {
        body: {
          nomCom: "Ubibi",
          descriptionCom: "super entreprise",
          addressCom: "14 rue ",
          villeCom: "sauvian",
          nbEmployeeCom: "vingt",
          mailCom: "ddzed@dede.fr",
          passCom: "cacaouettes",
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 201) {
            expect(statusCode).to.equal(201);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Création de la companie échouée");
              },
            };
          }
        },
      };

      await createCompanie(req, res);
    });


    it("Mettre a jour une companie", async () => {
      const req = {
        params: {
          id: 3, 
        },
        body: {
          nomCom: "Ubibi",
          descriptionCom: "super entreprise",
          addressCom: "14 rue ",
          villeCom: "sauvian",
          nbEmployeeCom: 20,
          mailCom: "ddzed@dede.fr",
          passCom: "cacaouettes",
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de la companie échouée");
              },
            };
          }
        },
      };

      await updateCompanie(req, res);
    });

    it("Mettre a jour une companie avec un nombre d'employé au mauvais format ", async () => {
      const req = {
        params: {
          id: 3, 
        },
        body: {
          nomCom: "Ubibi",
          descriptionCom: "super entreprise",
          addressCom: "14 rue ",
          villeCom: "sauvian",
          nbEmployeeCom: "vingt",
          mailCom: "ddzed@dede.fr",
          passCom: "cacaouettes",
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de la companie échouée");
              },
            };
          }
        },
      };

      await updateCompanie(req, res);
    });

    it("Mettre a jour une companie avec un id inexistant", async () => {
      const req = {
        params: {
          id: 58, 
        },
        body: {
          nomCom: "Ubibi",
          descriptionCom: "super entreprise",
          addressCom: "14 rue ",
          villeCom: "sauvian",
          nbEmployeeCom: 20,
          mailCom: "ddzed@dede.fr",
          passCom: "cacaouettes",
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de la companie échouée");
              },
            };
          }
        },
      };

      await updateCompanie(req, res);
    });

    it("Mettre a jour une companie avec une donnée vide", async () => {
      const req = {
        params: {
          id: 3, 
        },
        body: {
          nomCom: "",
          descriptionCom: "super entreprise",
          addressCom: "14 rue ",
          villeCom: "sauvian",
          nbEmployeeCom: 20,
          mailCom: "ddzed@dede.fr",
          passCom: "cacaouettes",
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Mise à jour de la companie échouée");
              },
            };
          }
        },
      };

      await updateCompanie(req, res);
    });


    it("Supprimer une companie", async () => {
      const req = {
        params: {
          id: 3, 
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Suppression de la companie échouée");
              },
            };
          }
        },
      };

      await deleteCompanie(req, res);
    });
    it("Supprimer une companie avec un id qui n'existe pas", async () => {
      const req = {
        params: {
          id: 58, 
        },
      };
      const res = {
        status: (statusCode) => {
          if (statusCode === 200) {
            expect(statusCode).to.equal(200);
            return {
              json: (data) => {
                expect(data).to.have.property("data");
              },
            };
          } else if (statusCode === 400) {
            expect(statusCode).to.equal(400);
            return {
              json: (data) => {
                expect(data).to.have.property("message", "Suppression de la companie échouée");
              },
            };
          }
        },
      };

      await deleteCompanie(req, res);
    });
});
