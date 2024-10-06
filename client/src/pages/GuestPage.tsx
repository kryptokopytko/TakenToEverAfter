import React, { useState, useEffect } from "react";
import GuestList from "../sections/GuestList/GuestList";
import Button, { ButtonContainer } from "../components/Button";
import { Heading, Label, Subtitle } from "../styles/typography";
import { Decision, Guest } from "../types";
import GuidedInput from "../components/GuidedInput";
import { Tag, TagContainer } from "../styles/tag";
import Input from "../components/Input";
import { Container, MenuContainer, Notification } from "../styles/page";
import { DropdownMenu, RadioButton, SelectorButton, SelectorContainer } from "../styles/Dropdown";
import { CustomCheckboxLabel, CustomCheckboxWrapper, HiddenCheckbox, StyledCheckbox } from "../styles/Checkbox";
import { SpaceBetweenContainer } from "../styles/section";
import { removeGuest, addGuest, updateGuestTags, handleDecision, handleInvite } from "../dummyDBApi";
import { guests as initialGuests } from "../dummyData";



const GuestPage: React.FC = ({
}) => {
  const [inputValue, setInputValue] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedGuestTags, setSelectedGuestTags] = useState<string[]>([]);
  const [currentGuest, setCurrentGuest] = useState<Guest | undefined>(undefined);
  const [currentDecision, setCurrentDecision] = useState<Decision | undefined>(undefined);
  const [notification, setNotification] = useState<string>('');
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isSortDropdowsOpen, setIsSortDropdowsOpen] = useState(false);
  const [isDecisionDropdowsOpen, setIsDecisionDropdowsOpen] = useState(false);
  const [isFilterTagDropdowsOpen, setIsFilterTagDropdowsOpen] = useState(false);
  const [isFilterDecisionDropdowsOpen, setIsFilterDecisionDropdowsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [filterByTag, setFilterByTag] = useState<string[]>([]);
  const [filterByDecision, setFilterByDecision] = useState<string>('all');

  useEffect(() => {
    const guest = guests.find(guest => guest.name.toLowerCase() === inputValue.toLowerCase());
    setCurrentGuest(guest);
    if (guest) {
      setSelectedGuestTags(guest.tags);
      setCurrentDecision(guest.decision);
    } else {
      setSelectedGuestTags([]);
      setCurrentDecision(undefined);
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

  const handleAddOrModifyGuest = () => {
    const trimmedName = inputValue.trim();
    if (trimmedName) {
      const existingGuest = guests.find(guest => guest.name.toLowerCase() === trimmedName.toLowerCase());

      if (existingGuest && currentDecision) {
        setGuests((prevGuests) =>
          prevGuests.map(guest =>
            guest.name === trimmedName ? { ...guest, tags: selectedGuestTags, decision: currentDecision } : guest
          )
        );
        updateGuestTags(trimmedName, selectedGuestTags);
        setNotification(`Modified: ${trimmedName}`);
      } else {
        const newGuest: Guest = { name: trimmedName, tags: selectedGuestTags, decision: currentDecision || 'not invited' };
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

  const filteredGuests = sortedGuests.filter(guest => {
    const tagMatch = filterByTag.length === 0 || filterByTag.every(tag => guest.tags.includes(tag));
    const decisionMatch = filterByDecision === 'all' || guest.decision === filterByDecision;
    return tagMatch && decisionMatch;
  });

  return (
    <Container>
      <MenuContainer >
        <div style={{ marginBottom: '-3rem' }}>
          <Heading level={2}>Manage guests</Heading>
        </div>

        <SpaceBetweenContainer>
          <Subtitle level={3}>Name:</Subtitle>
          <div style={{ width: '12rem' }}>
            {currentGuest && (
              <SelectorContainer>
                <SelectorButton onClick={() => setIsDecisionDropdowsOpen(!isDecisionDropdowsOpen)}>
                  <Subtitle level={3}>Decision {isDecisionDropdowsOpen ? "▵" : "▿"}</Subtitle>
                </SelectorButton>
                <DropdownMenu isOpen={isDecisionDropdowsOpen}>
                  {decisions.map((decision) => (
                    <RadioButton key={decision}>
                      <input
                        type="radio"
                        value={decision}
                        name="decision"
                        checked={currentDecision === decision}
                        onChange={() => setCurrentDecision(decision)}
                      />
                      <Label color="tertiary">{decision.charAt(0).toUpperCase() + decision.slice(1)}</Label>
                    </RadioButton>
                  ))}
                </DropdownMenu>
              </SelectorContainer>
            )}</div>
        </SpaceBetweenContainer>
        <GuidedInput
          size="medium"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          suggestions={guests.map((guest) => guest.name)}
          setInputValue={setInputValue}
          placeholder="Name"
        />

        <ButtonContainer>
          <Button onClick={handleAddOrModifyGuest}>
            {currentGuest ? "Modify" : "Add"}
          </Button>
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

        <Input
          value={newTag}
          onChange={handleNewTagChange}
          placeholder="Add a New Tag"
        />
        <ButtonContainer>
          <Button onClick={handleAddNewTag}>Add Tag</Button>
        </ButtonContainer>
      </MenuContainer>

      <GuestList isHomePage={false} guests={filteredGuests} handleDecision={handleDecisionChange} handleInvite={handleInviteChange}>
        <SelectorContainer onClick={() => { setIsFilterTagDropdowsOpen(!isFilterTagDropdowsOpen) }}>
          <Label color="dark">Filter By Tag {isFilterTagDropdowsOpen ? "▵" : "▿"}</Label>
          <DropdownMenu isOpen={isFilterTagDropdowsOpen}>
            {allTags.map((option) => (
              <div key={option} style={{ height: '4rem', alignItems: 'center' }}>
                <CustomCheckboxWrapper>
                  <CustomCheckboxLabel>
                    <HiddenCheckbox
                      type="checkbox"
                      value={option}
                      checked={filterByTag.includes(option)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setFilterByTag(prev => [...prev, option]);
                        } else {
                          setFilterByTag(prev => prev.filter(tag => tag !== option));
                        }
                      }}
                    />
                    <StyledCheckbox checked={filterByTag.includes(option)}>
                      <svg viewBox="8 4 10 14" width="18" height="18">
                        <polyline points="4 6 10 17 22 3 11 12" />
                      </svg>
                    </StyledCheckbox>
                  </CustomCheckboxLabel>
                  <Label color="tertiary">{option}</Label>
                </CustomCheckboxWrapper>
              </div>
            ))}
          </DropdownMenu>
        </SelectorContainer>

        <SelectorContainer onClick={() => { setIsFilterDecisionDropdowsOpen(!isFilterDecisionDropdowsOpen) }}>
          <Label color="dark">Filter By Decision {isFilterDecisionDropdowsOpen ? "▵" : "▿"}</Label>
          <DropdownMenu isOpen={isFilterDecisionDropdowsOpen}>
            {['all', ...decisions].map((decision) => (
              <RadioButton key={decision}>
                <input
                  type="radio"
                  value={decision}
                  name="decision"
                  checked={filterByDecision === decision}
                  onChange={(event) => { setFilterByDecision(event.target.value) }}
                />
                <Label color="tertiary">{decision}</Label>
              </RadioButton>
            ))}
          </DropdownMenu>
        </SelectorContainer>

        <SelectorContainer onClick={() => { setIsSortDropdowsOpen(!isSortDropdowsOpen) }}>
          <Label color="dark">Sort {isSortDropdowsOpen ? "▵" : "▿"}</Label>
          <DropdownMenu isOpen={isSortDropdowsOpen}>
            {['asc', 'desc'].map((option) => (
              <RadioButton key={option}>
                <input
                  type="radio"
                  value={option}
                  name="theme"
                  checked={sortBy === option}
                  onChange={(event) => { setSortBy(event.target.value as 'asc' | 'desc') }}
                />
                <Label color="tertiary">{option}</Label>
              </RadioButton>
            ))}
          </DropdownMenu>
        </SelectorContainer>
      </GuestList>
    </Container >
  );
};

export default GuestPage;
