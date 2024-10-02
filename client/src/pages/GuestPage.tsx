import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GuestList from "../sections/GuestList/GuestList";
import Button, { ButtonContainer } from "../components/Button";
import { Heading, Subtitle } from "../styles/typography";
import { Guest } from "../types";
import GuidedInput from "../components/GuidedInput";
import { Tag, TagContainer } from "../styles/tag";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  padding-bottom: 3rem;

  & > *:last-child {
    background-color: ${({ theme }) => theme.primary};
    padding: 0 3rem;
    flex: 100;
  }
`;

const MenuContainer = styled.div`
  padding: 0 2rem;
  padding-bottom: 2rem;
  background-color: ${({ theme }) => theme.light};
  display: flex;
  flex-direction: column;
  text-align: center;
  height: fit-content;
  min-width: 22rem;
  flex: 1 1 auto;
`;

const Notification = styled.span`
  color: ${({ theme }) => theme.dark};
  margin: 1rem 0;
`;

interface GuestListProps {
  guests: Guest[];
  updateGuestTags: (guestName: string, updatedTags: string[]) => void;
  addGuest: (guestName: string) => void;
  removeGuest: (guestName: string) => void;
}

const GuestPage: React.FC<GuestListProps> = ({ guests: initialGuests, updateGuestTags, addGuest, removeGuest }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedGuestTags, setSelectedGuestTags] = useState<string[]>([]);
  const [currentGuest, setCurrentGuest] = useState<Guest | undefined>(undefined);
  const [notification, setNotification] = useState<string>('');
  const [guests, setGuests] = useState<Guest[]>(initialGuests);

  useEffect(() => {
    const guest = guests.find(guest => guest.name.toLowerCase() === inputValue.toLowerCase());
    setCurrentGuest(guest);
    if (guest) {
      setSelectedGuestTags(guest.tags);
    } else {
      setSelectedGuestTags([]);
    }
  }, [inputValue, guests]);



  const getAllTags = () => {
    const allTags: string[] = [];
    guests.forEach(guest => {
      guest.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  };

  const allUniqueTags = getAllTags();
  const possibleTags = allUniqueTags.filter(tag => !selectedGuestTags.includes(tag));

  const handleAddTag = (tag: string) => {
    const updatedTags = [...selectedGuestTags, tag];
    setSelectedGuestTags(updatedTags);
    if (currentGuest) {
      updateGuestTags(currentGuest.name, updatedTags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = selectedGuestTags.filter(existingTag => existingTag !== tag);
    setSelectedGuestTags(updatedTags);
    if (currentGuest) {
      updateGuestTags(currentGuest.name, updatedTags);
    }
  };

  const handleAddGuest = () => {
    const trimmedName = inputValue.trim();
    if (trimmedName) {
      const existingGuest = guests.find(guest => guest.name.toLowerCase() === trimmedName.toLowerCase());

      if (existingGuest) {
        setNotification(`Guest "${trimmedName}" already exists!`);
      } else {
        const newGuest: Guest = { name: trimmedName, tags: selectedGuestTags, decision: 'maybe' };
        setGuests(prevGuests => [...prevGuests, newGuest]);
        addGuest(trimmedName);
        setNotification(`Added: ${trimmedName}`);
      }
    } else {
      alert("Guest name cannot be empty!");
    }
  };

  const handleDeleteGuest = () => {
    if (currentGuest) {
      setGuests(prevGuests => prevGuests.filter(guest => guest.name !== currentGuest.name));
      removeGuest(currentGuest.name);
      setNotification(`Removed: ${currentGuest.name}`);
    } else {
      alert("Please select a guest to delete!");
    }
  };

  return (
    <Container>
      <MenuContainer>
        <Heading level={2}>Manage guests</Heading>
        <GuidedInput
          size="medium"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          suggestions={guests.map((guest) => guest.name)}
          setInputValue={setInputValue}
          placeholder="name"
        />

        <ButtonContainer>
          <Button onClick={handleAddGuest}>Add</Button>
          <Button onClick={handleDeleteGuest}>Delete</Button>
        </ButtonContainer>

        {notification && <Notification>{notification}</Notification>}

        <span style={{ margin: '-1rem 0' }}>
          <Subtitle level={2}>Current Tags:</Subtitle>
        </span>
        {selectedGuestTags.length > 0 && (
          <TagContainer>
            {selectedGuestTags.map((tag, index) => (
              <Tag key={index} onClick={() => handleRemoveTag(tag)}>
                {tag}
              </Tag>
            ))}
          </TagContainer>
        )}

        {possibleTags.length > 0 && (
          <>
            <span style={{ margin: '-1rem 0' }}>
              <Subtitle level={2}>Add Tags:</Subtitle>
            </span>
            <TagContainer>
              {possibleTags.map((tag, index) => (
                <Tag key={index} onClick={() => handleAddTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </TagContainer>
          </>
        )}
      </MenuContainer>
      <GuestList isHomePage={false} guests={guests} />
    </Container>
  );
};

export default GuestPage;
