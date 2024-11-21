import React, { useState, useEffect } from "react";
import GuestList from "../sections/GuestList/GuestList";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Heading, Subtitle } from "../styles/typography";
import { Decision, Guest } from "../types";
import GuidedInput from "../components/ui/GuidedInput";
import { Tag, TagContainer } from "../styles/tag";
import Input from "../components/ui/Input";
import { Container, MenuContainer, Notification } from "../styles/page";
import { SelectorContainer } from "../components/ui/Dropdown/DropdownStyles";
import { SpaceBetweenContainer } from "../styles/section";
import { removeGuest, addGuest, updateGuestTags, updateTags, handleDecision, handleInvite } from "../dummyDBApi";
import { guests as initialGuests } from "../dummyData";
import DropdownSelector from "../components/ui/Dropdown/Dropdown";

const GuestPage: React.FC = ({
}) => {
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedGuestTags, setSelectedGuestTags] = useState<string[]>([]);
  const [currentGuest, setCurrentGuest] = useState<Guest | undefined>(undefined);
  const [currentDecision, setCurrentDecision] = useState<Decision | undefined>(undefined);
  const [notification, setNotification] = useState<string>('');
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [filterByTag, setFilterByTag] = useState<string[]>([]);
  const [filterByDecision, setFilterByDecision] = useState<string | string[]>('all');
  const [newTagWeight, setNewTagWeight] = useState('');
  const [emailError, setEmailError] = useState<string>('');

  useEffect(() => {
    const guest = guests.find(guest => guest.name.toLowerCase() === inputValue.toLowerCase());
    setCurrentGuest(guest);
    if (guest) {
      setSelectedGuestTags(guest.tags);
      setCurrentDecision(guest.decision);
      setEmailValue(guest.email || '');
    } else {
      setSelectedGuestTags([]);
      setCurrentDecision(undefined);
      setEmailValue('');
    }
  }, [inputValue, guests]);


  useEffect(() => {
    setAllTags(getAllTags());
  }, [guests]);

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

  const allDecisions = guests.map((guest) => guest.decision);
  const decisions = [...new Set(allDecisions)];

  const handleNewTagWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTagWeight(value.split('').filter(c => c >= '0' && c <= '9').join(''));
  };

  const handleDecisionChange = (guestName: string, decision: 'yes' | 'no') => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.name === guestName ? { ...guest, decision } : guest
      )
    );
    handleDecision(guestName, decision);
  };

  const handleInviteChange = (guestName: string) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.name === guestName ? { ...guest, decision: 'maybe' } : guest
      )
    );
    handleInvite(guestName);
  }

  const possibleTags = allTags.filter(tag => !selectedGuestTags.includes(tag));

  const handleAddTag = (tag: string) => {
    const weight = Number(newTagWeight);
    const updatedTags = [...selectedGuestTags, tag];
    setSelectedGuestTags(updatedTags);
    if (currentGuest) {
      updateGuestTags(currentGuest.name, emailValue, updatedTags);
      updateTags(tag, weight);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const updatedTags = selectedGuestTags.filter(existingTag => existingTag !== tag);
    setSelectedGuestTags(updatedTags);
    if (currentGuest) {
      updateGuestTags(currentGuest.name, emailValue, updatedTags);
    }
  };

  const handleAddOrModifyGuest = () => {
    const trimmedName = inputValue.trim();
    if (trimmedName) {
      const existingGuest = guests.find(guest => guest.name.toLowerCase() === trimmedName.toLowerCase());

      if (!isValidEmail(emailValue)) {
        setEmailError("Please enter a valid email address.");
        return;
      } else {
        setEmailError('');
      }


      if (existingGuest && currentDecision) {
        setGuests((prevGuests) =>
          prevGuests.map(guest =>
            guest.name === trimmedName ? { ...guest, tags: selectedGuestTags, decision: currentDecision, email: emailValue } : guest
          )
        );
        updateGuestTags(trimmedName, emailValue, selectedGuestTags);
        setNotification(`Modified: ${trimmedName}`);
      } else {
        const newGuest: Guest = { name: trimmedName, tags: selectedGuestTags, decision: currentDecision || 'not invited', email: emailValue };
        setGuests(prevGuests => [...prevGuests, newGuest]);
        addGuest(trimmedName, emailValue);
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

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddNewTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !allTags.includes(trimmedTag)) {
      setAllTags(prevTags => [...prevTags, trimmedTag]);
      setNewTag('');
    } else {
      alert("Tag is empty or already exists!");
    }
  };

  const sortedGuests = [...guests].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const isValidEmail = (email: string): boolean => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const filteredGuests = sortedGuests.filter(guest => {
    const tagMatch = filterByTag.length === 0 || filterByTag.every(tag => guest.tags.includes(tag));
    const decisionMatch = filterByDecision === 'all' || guest.decision === filterByDecision;
    return tagMatch && decisionMatch;
  });

  return (
    <Container>
      <MenuContainer >
        <Heading level={2}>Manage guests</Heading>

        <SpaceBetweenContainer>
          <Subtitle level={3}>Name:</Subtitle>
          {currentGuest && (
            <SelectorContainer>
              <DropdownSelector
                title="Decision"
                initialSelectedOption={currentGuest.decision}
                options={decisions.map((decision) => ({
                  label: decision.charAt(0).toUpperCase() + decision.slice(1),
                  value: decision,
                }))}
                onOptionSelect={(selectedOption) => setCurrentDecision(selectedOption as Decision)}
              />
            </SelectorContainer>
          )}
        </SpaceBetweenContainer>
        <GuidedInput
          size="medium"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          suggestions={guests.map((guest) => guest.name)}
          setInputValue={setInputValue}
          placeholder="Name"
        />
        <div style={{ textAlign: 'left' }}>
          <Subtitle level={3}>Email:</Subtitle>
        </div>
        <Input
          size="medium"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          type="email"
          placeholder="Enter email..."
        />
        {emailError && <Notification>{emailError}</Notification>}
        <ButtonContainer>
          <Button onClick={handleAddOrModifyGuest}>
            {currentGuest ? "Modify" : "Add"}
          </Button>
          <Button onClick={handleDeleteGuest}>Delete</Button>
        </ButtonContainer>

        {notification && <Notification>{notification}</Notification>}

        <Subtitle level={2}>Current Tags:</Subtitle>
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
            <Subtitle level={2}>Add Tags:</Subtitle>
            <TagContainer>
              {possibleTags.map((tag, index) => (
                <Tag key={index} onClick={() => handleAddTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </TagContainer>
          </>
        )}
        <div style={{ margin: '0.5rem' }}>
          New tag name
          <Input
            value={newTag}
            onChange={handleNewTagChange}
            placeholder="Add a New Tag"
          />
        </div>
        <div style={{ margin: '0.5rem' }}>
          New tag weight
          <Input
            value={newTagWeight}
            onChange={handleNewTagWeightChange}
            placeholder="Add Tag Weight"
            type="number"
          />
        </div>

        <ButtonContainer>
          <Button onClick={handleAddNewTag}>Add Tag</Button>
        </ButtonContainer>
      </MenuContainer>

      <GuestList isHomePage={false} guests={filteredGuests} handleDecision={handleDecisionChange} handleInvite={handleInviteChange}>

        <SelectorContainer>
          <DropdownSelector
            title="Filter by Tag"
            initialSelectedOption={filterByTag.join(", ") || "All"}
            options={allTags.map(tag => ({ label: tag, value: tag }))}
            onOptionSelect={(selectedOption) => {
              setFilterByTag((prev) => {
                return prev.includes(selectedOption)
                  ? prev.filter(tag => tag !== selectedOption)
                  : [...prev, selectedOption];
              });
            }}
          />
        </SelectorContainer>

        <SelectorContainer>
          <DropdownSelector
            title="Filter by Decision"
            initialSelectedOption={filterByDecision}
            options={[
              { label: "All", value: "all" },
              ...decisions.map(decision => ({
                label: decision.charAt(0).toUpperCase() + decision.slice(1),
                value: decision,
              }))
            ]}
            onOptionSelect={(selectedOption) => {
              if (Array.isArray(selectedOption)) {
                setFilterByDecision(selectedOption);
              } else {
                setFilterByDecision(selectedOption);
              }
            }}
            multiSelect={true}
          />
        </SelectorContainer>
        <SelectorContainer>
          <DropdownSelector
            title="Sort"
            initialSelectedOption={sortBy}
            options={[
              { label: "Ascending", value: "asc" },
              { label: "Descending", value: "desc" }
            ]}
            onOptionSelect={(selectedOption) => setSortBy(selectedOption as 'asc' | 'desc')}
          />
        </SelectorContainer>
      </GuestList>
    </Container >
  );
};

export default GuestPage;
