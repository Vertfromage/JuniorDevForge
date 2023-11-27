import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import dbConnect from "../../lib/dbConnect";
import Team, { Teams } from "../../models/Team";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./teamProfileStyles.module.css";

interface Props {
  team: Teams;
}

interface User {
  _id: string;
  email: string;
  imageUrl: string;
  firstName: string;
  lastName?: string;
  role: string;
  city: string;
  province: string;
}

const TeamProfile = ({ team }: Props) => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showRemoveAndAddButtons, setShowRemoveAndAddButtons] = useState(false);

  useEffect(() => {
    // Fetch user, team members, and available users on mount or team changes
    const fetchUser = async (id: string) => {
      try {
        const response = await fetch("/api/users/" + id);
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    };

    const fetchAllMembers = async () => {
      try {
        if (team && team.teamMembers) {
          const userPromises = team.teamMembers.map((mem) => fetchUser(mem));
          const usersData = await Promise.all(userPromises);
          const filteredUsersData = usersData.filter(
            (userData) => userData !== null
          );
          setMembers(filteredUsersData);
        }
      } catch (error) {
        setError("Error fetching team members");
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailableUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();

        if (data.success) {
          const usersNotInTeam = data.data.filter(
            (user: User) => !team.teamMembers.includes(user._id)
          );
          setAvailableUsers(usersNotInTeam);
        } else {
          setError("Error fetching available users");
        }
      } catch (error) {
        setError("Error fetching available users");
        console.error("Error fetching available users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMembers();
    fetchAvailableUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team?.teamMembers]);

  const handleEditTeam = async () => {
    setIsDropdownVisible(true);
    setShowRemoveAndAddButtons(true);
   
  };
  const handleAddMember = async () => {
    if (selectedUserId) {
      try {
        const response = await fetch('/api/teams/addTeamMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ teamId: team._id, userId: selectedUserId }),
        });

        const data = await response.json();

        if (data.success) {
          // Refresh the component or update the team members state
          // based on the successful addition
          console.log('Member added successfully!');
        } else {
          console.error('Error adding member:', data.error);
        }
      } catch (error) {
        console.error('Error adding member:', error);
      }
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      const response = await fetch('/api/teams/removeTeamMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamId: team._id, userId }), // Keep userId as string
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Member removed successfully!');
      } else {
        console.error('Error removing member:', data.error);
      }
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };
  
  return (
    <Layout>
      <h1>Team Page: {team.projectId}</h1>
      {/* Display team members */}
      {members.map((mem) => (
        <div key={mem._id}>
          <div className={styles.membersButton}>
            <Link href={`/users/${mem._id}`}>
              <button className={`${styles.btn} view`}>
                <h2 className={styles.memberName}>
                  {mem.firstName} {mem.lastName}
                </h2>
                 {mem.imageUrl ? (
                  <Image
                    src={mem?.imageUrl || ""}
                    width={100}
                    height={100}
                    alt="Picture of the user"
                  />
                ) : (
                  <></>
                )}
              </button>
            </Link>
            {showRemoveAndAddButtons && (
              <span
                className={styles.removeButton}
                onClick={() => handleRemoveMember(mem._id)}
              >
                Remove
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Display the "Add Member" button */}
      <span>
      {showRemoveAndAddButtons && (
       <div className={styles.addMemberButton}>
       <span onClick={handleAddMember}>
         Add Member
       </span>
     </div>
     
        
      )}
      </span>
      {/* Display the "Edit Team" button */}
      <div>
      <span>
        <button className={styles.editTeamButton} onClick={handleEditTeam}>
          Edit Team
        </button>
        </span>
        {isDropdownVisible && (
          <div className={styles.userDropdown}>
            {/* Display a dropdown menu with available users */}
            <select
              className={styles.dropdownSelect}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {availableUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  await dbConnect();

  const teamId = context.params?.id as string;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return {
        notFound: true,
      };
    }

    const serializedTeam = JSON.parse(JSON.stringify(team));

    return {
      props: {
        team: serializedTeam,
      },
    };
  } catch (error) {
    console.error("Error fetching team:", error);

    return {
      notFound: true,
    };
  }
};

export default TeamProfile;
