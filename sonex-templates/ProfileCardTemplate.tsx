import React from 'react';
import './TemplateStyles.css';

// interface ProfileCardTemplateProps {
//   data: {
//     session?: {
//       token: string;
//       userId?: string;
//     };
//     conversationId?: string;
//     text?: string;
//     intent?: string | null;
//     parameters: {
//       user: {
//         id: string;
//         email: string;
//         profile: Array<{
//           fullName: string;
//           contactDetails?: string;
//           address?: {
//             city?: string;
//             line1?: string;
//             state?: string;
//             country?: string;
//             pincode?: string;
//           };
//           phone?: string;
//           gender?: string;
//         }>;
//         createdAt?: string;
//         updatedAt?: string;
//         authTokens?: Array<{
//           id: string;
//           status: string;
//           createdAt: string;
//           expiresAt: string;
//         }>;
//       };
//     };
//     clarification?: string;
//     [key: string]: any;
//   };
// }

interface ProfileCardTemplateProps {
  data: {
    session?: {
      token: string;
      userId?: string;
    };
    conversationId?: string;
    text?: string;
    intent?: string | null;
    parameters: {
      profile: Array<{
          id?: string;
          userId?: string;
          fullName?: string;
          bio?: string;
          age?: number;
          address?: string;
          phone?: string;
          gender?: string;
        }>;
    };
    clarification?: string;
    [key: string]: any;
  };
}

/**
 * Custom template for rendering user profile information
 * Displays profile details in a card format
 */
export const ProfileCardTemplate: React.FC<ProfileCardTemplateProps> = ({ data }) => {
  const { parameters, clarification } = data;
  const user = parameters;
  const profile = user.profile[0]; // Get the first profile
  // const activeToken = user.authTokens?.find((token: any) => token.status === 'ACTIVE');

  // Format date helper (currently unused but kept for future use)
  // const formatDate = (dateString?: string) => {
  //   if (!dateString) return null;
  //   try {
  //     return new Date(dateString).toLocaleDateString('en-US', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric'
  //     });
  //   } catch {
  //     return dateString;
  //   }
  // };

  // Format full address
  // const formatAddress = () => {
  //   if (!profile.address) return null;
  //   const { line1, city, state, country, pincode } = profile.address;
  //   const parts = [line1, city, state, country, pincode].filter(Boolean);
  //   return parts.join(', ');
  // };

  // const fullAddress = formatAddress();

  return (
    <div className="sonex-template-card profile-card">
      <div className="template-card-header">
        <div className="template-card-icon profile-icon">👤</div>
        <div className="template-card-title">User Profile</div>
      </div>
      
      <div className="template-card-body">
        {/* Full Name */}
        <div className="template-field template-field-highlight">
          <span className="template-field-label">Name:</span>
          <span className="template-field-value profile-name">{profile.fullName}</span>
        </div>

        {/* Email */}
        {/* <div className="template-field">
          <span className="template-field-label">Email:</span>
          <span className="template-field-value">{user.email}</span>
        </div> */}

        {/* Phone */}
        {profile.phone && (
          <div className="template-field">
            <span className="template-field-label">Phone:</span>
            <span className="template-field-value">{profile.phone}</span>
          </div>
        )}

        {/* Gender */}
        {profile.gender && (
          <div className="template-field">
            <span className="template-field-label">Gender:</span>
            <span className="template-field-value template-badge">{profile.gender}</span>
          </div>
        )}

        {/* age */}
        {profile.age && (
          <div className="template-field">
            <span className="template-field-label">age:</span>
            <span className="template-field-value template-badge">{profile.age}</span>
          </div>
        )}

        {/* Contact Details */}
        {/* {profile.contactDetails && (
          <div className="template-field">
            <span className="template-field-label">Contact:</span>
            <span className="template-field-value">{profile.contactDetails}</span>
          </div>
        )} */}

        {/* Full Address */}
        {profile.address && (
          <div className="template-field">
            <span className="template-field-label">Address:</span>
            <span className="template-field-value">{profile.address}</span>
          </div>
        )}

        {/* Account Status Section */}
        {/* <div className="template-divider"></div> */}

        {/* User ID */}
        {/* <div className="template-field">
          <span className="template-field-label">User ID:</span>
          <span className="template-field-value template-code">{user.id}</span>
        </div> */}

        {/* Account Created */}
        {/* {user.createdAt && (
          <div className="template-field">
            <span className="template-field-label">Member Since:</span>
            <span className="template-field-value">{formatDate(user.createdAt)}</span>
          </div>
        )} */}

        {/* Active Token Status */}
        {/* {activeToken && (
          <div className="template-field">
            <span className="template-field-label">Account Status:</span>
            <span className="template-field-value">
              <span className="template-status-badge template-status-active">
                {activeToken.status}
              </span>
            </span>
          </div>
        )} */}

        {/* Token Expiry */}
        {/* {activeToken?.expiresAt && (
          <div className="template-field">
            <span className="template-field-label">Session Expires:</span>
            <span className="template-field-value">{formatDate(activeToken.expiresAt)}</span>
          </div>
        )} */}
      </div>
      
      {clarification && (
        <div className="template-card-footer">
          <p className="template-clarification">{clarification}</p>
        </div>
      )}
    </div>
  );
};

