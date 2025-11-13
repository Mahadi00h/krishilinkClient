import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL
      });
      
      toast.success('Profile updated successfully!');
      setEditing(false);
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-secondary-800 mb-3">
            My Profile
          </h1>
          <p className="text-lg text-gray-600 font-body">
            Manage your account information
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="card bg-white shadow-2xl">
            <div className="card-body">
              {/* Profile Header */}
              <div className="flex flex-col items-center mb-8">
                <div className="avatar mb-4">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-4">
                    <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt={user?.displayName} />
                  </div>
                </div>
                {!editing && (
                  <>
                    <h2 className="text-3xl font-display font-bold text-secondary-800">
                      {user?.displayName}
                    </h2>
                    <p className="text-gray-500 font-body">{user?.email}</p>
                    <button
                      onClick={() => setEditing(true)}
                      className="btn btn-primary btn-sm mt-4 font-body"
                    >
                      Edit Profile
                    </button>
                  </>
                )}
              </div>

              {editing ? (
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">Full Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered font-body"
                      value={formData.displayName}
                      onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered font-body"
                      value={user?.email}
                      disabled
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">Email cannot be changed</span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold font-body">Photo URL</span>
                    </label>
                    <input
                      type="url"
                      className="input input-bordered font-body"
                      value={formData.photoURL}
                      onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className={`btn btn-primary flex-1 font-body ${loading ? 'loading' : ''}`}
                      disabled={loading}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          displayName: user?.displayName || '',
                          photoURL: user?.photoURL || ''
                        });
                      }}
                      className="btn btn-ghost flex-1 font-body"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="divider"></div>
                  
                  <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                    <div className="stat">
                      <div className="stat-figure text-primary">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="stat-title font-body">Member Since</div>
                      <div className="stat-value text-2xl text-primary font-display">
                        {new Date(user?.metadata?.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure text-secondary">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="stat-title font-body">Account Status</div>
                      <div className="stat-value text-2xl text-success font-display">Active</div>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="font-body">Your email is verified and account is secure.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;