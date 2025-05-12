async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const center = { lat: 49.3292264, lng: -123.0726468 };
    const map = new Map(document.getElementById("map"), {
      zoom: 11,
      center,
      mapId: "4504f8b37365c3d0",
    });
  
    for (const school of schools) {
      const SchoolMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        content: buildContent(school),
        position: school.position,
        title: school.name,
      });
  
      SchoolMarker.addListener("gmp-click", () => {
        toggleHighlight(SchoolMarker, school);
      });
    }
  }
  
  function toggleHighlight(markerView, property) {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }
  
  function buildContent(property) {
    const content = document.createElement("div");

    if (property.type === "school") {
      content.classList.add("school");
      content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-school" title="school"></i>
          <span class="fa-sr-only">school</span>
      </div>
      <div class="details">
          <div class="name">${property.name}</div>
          <div class="address">${property.address}</div>
          <div class="district">${property.district}</div>
          <div class="requests">
          <div>
              <span>${property.requests[0]}</span>
              <span>${property.requests[1]}</span>
          </div>
          </div>
      </div>
      `;
      return content;
    }
  }

  const schools = [
    {
      name: "Capilano Elementary School",
      type: "school",
      address: "1230 20th St W, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3280176,
        lng: -123.1087725
      }
    },
    {
      name: "Highlands Elementary School",
      type: "school",
      address: "3150 Colwood Dr, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3384867,
        lng: -123.0975259
      }
    },
    {
      name: "Larson Elementary School",
      type: "school",
      address: "2605 Larson Rd, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3333691,
        lng: -123.085248
      }
    },
    {
      name: "Westview Elementary School",
      type: "school",
      address: "641 17th Street West, North Vancouver, BC",
      district: "School District 44",
      requests: ["Request 1", "Request 2"],
      programs: ["Program 1"],
      position: {
        lat: 49.3238414,
        lng: -123.0894738
      }
    }
  ]
  
  initMap();