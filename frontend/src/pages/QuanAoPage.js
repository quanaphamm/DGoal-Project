import React, { useEffect } from 'react';

const QuanAoPage = () => {
    useEffect(() => {
        console.log("QuanAoPage rendered");
        
        // Cleanup function
        return () => {
            console.log("QuanAoPage unmounted");
        };
    }, []); // Empty dependency array means this runs once on mount
    
    // Rest of your component...
}; 