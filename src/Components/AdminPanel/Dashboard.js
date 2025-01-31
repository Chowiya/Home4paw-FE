import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/UseAuthContext';

const Dashboard = () => {
    const {user} =useAuthContext()
    const [userData, setUserData] = useState({});

    const [totalPets, setTotalPets] = useState(0);

    useEffect(() => {
        const fetchData = async () => {

            if(!user || !user.token){
                console.log("User is not authenticated");
                return;

            }
            try {
                const userResponse = await fetch(`${process.env.REACT_APP_URL}/Dashboard/user-registrations`,{
                    headers:{
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!userResponse.ok) {
                    console.error('Failed to fetch user data:', userResponse.status);
                    return;
                }
               
                const userData = await userResponse.json();
                setUserData(userData);

             

                
        const petResponse = await fetch(`${process.env.REACT_APP_URL}/pet-types`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          });
  
          if (!petResponse.ok) {
            console.error('Failed to fetch pet types:', petResponse.status);
            return;
          }


                const petData = await petResponse.json();


 // Check if petData is an array
 if (!Array.isArray(petData)) {
    throw new Error('Expected pet data to be an array.');
  }

                const petDataMapped = petData.map(item => ({ name: item._id, value: item.count }));

                setTotalPets(petDataMapped.reduce((acc, item) => acc + item.value, 0));
            
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user]);



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
