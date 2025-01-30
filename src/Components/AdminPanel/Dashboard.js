import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [userData, setUserData] = useState({});

    const [totalPets, setTotalPets] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await fetch('http://localhost:4000/Dashboard/user-registrations');
                const userData = await userResponse.json();
                setUserData(userData);

                const petResponse = await fetch('http://localhost:4000/Dashboard/pet-types');
                const petData = await petResponse.json();
                const petDataMapped = petData.map(item => ({ name: item._id, value: item.count }));

                setTotalPets(petDataMapped.reduce((acc, item) => acc + item.value, 0));
            
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="dashboard-container">
            <div className="total-users">
                <h2>Total Registered Users</h2>
                <h3>{userData.count || 0}</h3>
            </div>

            <div className="pie-chart-container">
                <h2>Distribution of Pet Types</h2>
                <h3>Total Pets: {totalPets}</h3>

                
            </div>
        </div>
    );
};

export default Dashboard;
