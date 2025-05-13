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
  
  function toggleHighlight(markerView, institution) {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  }
  
  function buildContent(institution) {
    const content = document.createElement("div");

    if (institution.type === "school") {
      content.classList.add("school");
      content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-school" title="school"></i>
          <span class="fa-sr-only">school</span>
      </div>
      <div class="details">
          <div class="name">${institution.name}</div>
          <div class="address">${institution.address}</div>
          <div class="district">${institution.district}</div>
          <div class="requests">
          <div>
            <button>${institution.requests[0]}</button>
            <button>${institution.requests[1]}</button>
          </div>
          </div>
      </div>
      `;
      console.log(`Generated content for school markers.`)
      return content;
    }
  }

  function buildSidebar(markerView, institution) {
    const content = document.createElement("div");

    content.classList.add("sidebar");

    content.innerHTML = `
    <div class="${institution.type}-details">
      <h1>${institution.name}</h1>
    </div>
    `;
    console.log(`Generated sidebar.`)
    return content;
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