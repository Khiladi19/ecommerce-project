import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressThunk } from '../redux/slices/addressSlice'

const AllAddresses = () => {
  const dispatch = useDispatch();
  const { addresses, loading, error } = useSelector((state) => state.address);
  

  useEffect(() => {
    dispatch(getAddressThunk());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Saved Addresses</h2>

      {loading && <p>Loading addresses...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {addresses?.length === 0 && !loading && (
        <p className="text-gray-600 text-center">No addresses found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="border rounded p-4 shadow-sm hover:shadow-lg transition"
          >
            <p><strong>{address.fullName}</strong></p>
            <p>{address.address}</p>
            <p>{address.city}, {address.state}, {address.pincode}</p>
            <p>{address.country}</p>
            <p>📞 {address.phoneNumber}</p>
            <p className="text-sm text-gray-400 mt-2">
              Added on {new Date(address.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAddresses;
