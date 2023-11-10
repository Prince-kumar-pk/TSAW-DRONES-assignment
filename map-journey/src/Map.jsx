import React, { useState, useEffect } from 'react';

const Map = () => {
  const [point1, setPoint1] = useState({ latitude: 28.7565, longitude: 77.756578 });
  const [point2, setPoint2] = useState({ latitude: 28.9565, longitude: 77.706578 });
  const [avatarPosition, setAvatarPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: point1.latitude, lng: point1.longitude },
      zoom: 9,
    });

    const avatarMarker = new window.google.maps.Marker({
      position: { lat: avatarPosition.latitude, lng: avatarPosition.longitude },
      map: map,
    });

    // Add markers for each point
    const marker1 = new window.google.maps.Marker({
      position: { lat: point1.latitude, lng: point1.longitude },
      map: map,
    });

    const marker2 = new window.google.maps.Marker({
      position: { lat: point2.latitude, lng: point2.longitude },
      map: map,
    });

    // Add a polyline to represent the path
    const polyline = new window.google.maps.Polyline({
      path: [
        { lat: point1.latitude, lng: point1.longitude },
        { lat: point2.latitude, lng: point2.longitude },
      ],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(map);

    const totalDuration = 30000; 
    const numSteps = 100;
    const stepDuration = totalDuration / numSteps;
    let currentStep = 0;

    const animateAvatar = () => {
      const latStep = (point2.latitude - point1.latitude) / numSteps;
      const lngStep = (point2.longitude - point1.longitude) / numSteps;

      const newLat = point1.latitude + latStep * currentStep;
      const newLng = point1.longitude + lngStep * currentStep;

      setAvatarPosition({ latitude: newLat, longitude: newLng });
      avatarMarker.setPosition({ lat: newLat, lng: newLng });

      currentStep++;

      if (currentStep <= numSteps) {
        setTimeout(animateAvatar, stepDuration);
      }
    };

    animateAvatar();

    return () => {
    
      avatarMarker.setMap(null);
      marker1.setMap(null);
      marker2.setMap(null);
      polyline.setMap(null);
    };
  }, [point1, point2, avatarPosition]);
  
    const handleSubmit = (e) => {
      e.preventDefault();

      setPoint1({
        latitude: parseFloat(e.target.elements.latitude1.value),
        longitude: parseFloat(e.target.elements.longitude1.value),
      });
  
      setPoint2({
        latitude: parseFloat(e.target.elements.latitude2.value),
        longitude: parseFloat(e.target.elements.longitude2.value),
      });
    };
  
    return (
        
        <div className="max-w-screen-lg mx-auto p-8">
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Point 1:</label>
      <div className="flex">
        <input
          type="number"
          name="latitude1"
          value={point1.latitude}
          placeholder="Latitude"
          step="0.0001"
          onChange={(e) => setPoint1({ ...point1, latitude: parseFloat(e.target.value) })}
          className="w-1/2 mr-2 p-2 border rounded"
        />
        <input
          type="number"
          name="longitude1"
          value={point1.longitude}
          placeholder="Longitude"
          step="0.0001"
          onChange={(e) => setPoint1({ ...point1, longitude: parseFloat(e.target.value) })}
          className="w-1/2 p-2 border rounded"
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Point 2:</label>
      <div className="flex">
        <input
          type="number"
          name="latitude2"
          value={point2.latitude}
          placeholder="Latitude"
          step="0.0001"
          className="w-1/2 mr-2 p-2 border rounded"
        />
        <input
          type="number"
          name="longitude2"
          value={point2.longitude}
          placeholder="Longitude"
          step="0.0001"
          className="w-1/2 p-2 border rounded"
        />
      </div>
    </div>

    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Show Path</button>
  </form>

  <h2 className="text-2xl">IF map not load use another google map api key in script in public/index.html</h2>

  <div id="map" className="mt-8" style={{ width: '100%', height: '400px' }} />
</div>
    );
}

export default Map