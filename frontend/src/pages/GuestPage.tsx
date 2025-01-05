import React, { useState, useEffect } from "react";
import GuestList from "../sections/GuestList/GuestList";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Heading, Subtitle } from "../styles/typography";
import { Decision, Guest, Tag } from "../types";
import GuidedInput from "../components/ui/GuidedInput";
import { StyledTag, TagContainer } from "../styles/tag";
import Input from "../components/ui/Input";
import { Container, MenuContainer, Notification } from "../styles/page";
import { SelectorContainer } from "../components/ui/Dropdown/DropdownStyles";
import { SpaceBetweenContainer } from "../styles/section";
import useFunctionsProxy from "../API/FunctionHandler";
import DropdownSelector from "../components/ui/Dropdown/Dropdown";
import Checkbox from "../components/ui/Checkbox";
import { useUser } from "../providers/UserContext";

const GuestPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [pairValue, setPairValue] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedGuestTags, setSelectedGuestTags] = useState<Tag[]>([]);
  const [currentGuest, setCurrentGuest] = useState<Guest | undefined>(undefined);
  const [currentDecision, setCurrentDecision] = useState<Decision | undefined>(undefined);
  const [notification, setNotification] = useState<string>('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [filterByTag, setFilterByTag] = useState<string>('');
  const [filterByDecision, setFilterByDecision] = useState<string>('all');
  const [newTagWeight, setNewTagWeight] = useState('');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [pairs, setPairs] = useState<{ guest: string, partner: string }[]>([]);
  const [arePair, setArePair] = useState(false);
  const [oneInvite, setOneInvite] = useState(false);
  const FunctionsProxy = useFunctionsProxy();
  const {guests, tags} = useUser();

  const getPartner = (guestName: string): string | null => {
    const pair = pairs.find((pair) => pair.guest === guestName);
    return pair ? pair.partner : null;
  };


  useEffect(() => {
    const guest = guests.find(guest => guest.name.toLowerCase() === inputValue.toLowerCase());
    setCurrentGuest(guest);
    if (guest) {
      setSelectedGuestTags(tags.filter(tag => guest.tags.includes(tag.id)));
      setCurrentDecision(guest.decision);
      setHasPlusOne(guest.hasPlusOne ?? false);
      const pair = getPartner(guest.name);
      if (pair)
        setPairValue(pair);

    } else {
      setSelectedGuestTags([]);
      setCurrentDecision(undefined);
    }

  }, [inputValue, guests]);

  useEffect(() => {
    if (currentGuest && pairExists(currentGuest?.name, pairValue))
      setArePair(true);
    else
      setArePair(false);
  }, [pairValue, pairs])

  const allDecisions = guests.map((guest) => guest.decision || 'not invited');
  const decisions = Array.from(new Set(allDecisions));

  const handleNewTagWeightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewTagWeight(value.replace(/\D/g, ''));
  };

  const handleRemoveTag = (tag: Tag) => {
    const updatedTags = selectedGuestTags.filter(existingTag => existingTag.id !== tag.id);
    setSelectedGuestTags(updatedTags);
  };

  const handleAddOrModifyGuest = () => {
    const trimmedName = inputValue.trim();
    if (trimmedName) {
      const existingGuest = guests.find(guest => guest.name.toLowerCase() === trimmedName.toLowerCase());
      if (existingGuest && currentDecision) {
        FunctionsProxy.updateGuestTags(existingGuest.id, selectedGuestTags.map(tag => tag.id));
        setNotification(`Modified: ${trimmedName}`);
      } else {
        FunctionsProxy.addGuest(trimmedName, selectedGuestTags.map(tag => tag.id), hasPlusOne );
        setNotification(`Added: ${trimmedName}`);
      }
    } else {
      alert("Guest name cannot be empty!");
    }
  };

  const handleDeleteGuest = () => {
    if (currentGuest) {
      FunctionsProxy.removeGuest(currentGuest.id);
      setNotification(`Removed: ${currentGuest.name}`);
    } else {
      alert("Please select a guest to delete!");
    }
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddNewTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !allTags.includes(trimmedTag)) {
      setAllTags(prevTags => [...prevTags, trimmedTag]);
      setNewTag('');
      setOneInvite(false);
    } else {
      alert("Tag is empty or already exists!");
    }
  };

  const addPair = (guestName: string, partnerName: string) => {
    setPairs((prevPairs) => [
      ...prevPairs,
      { guest: guestName, partner: partnerName },
      { guest: partnerName, partner: guestName },
    ]);
  };

  const removePair = (guestName: string, partnerName: string) => {
    setPairs((prevPairs) =>
      prevPairs.filter(
        (pair) =>
          !(
            (pair.guest === guestName && pair.partner === partnerName) ||
            (pair.guest === partnerName && pair.partner === guestName)
          )
      )
    );
  };

  const handleAddOrRemovePartner = () => {
    if (currentGuest && pairValue) {
      if (pairExists(currentGuest.name, pairValue)) {
        removePair(currentGuest.name, pairValue);
        setNotification(`Removed partner: ${pairValue}`);
      } else {
        addPair(currentGuest.name, pairValue);
        setNotification(`Added partner: ${pairValue}`);
      }
    } else {
      alert("Please select a guest and a partner!");
    }
  };

  const pairExists = (guestName: string, partnerName: string): boolean => {
    return pairs.some(pair => pair.guest === guestName && pair.partner === partnerName);
  };


  return (
    <Container>
      <MenuContainer >
        <Heading level={2}>Manage guests</Heading>
        <SpaceBetweenContainer style={{ margin: 0, padding: 0 }}>
          {!currentGuest && <Subtitle level={3}>Name:</Subtitle>}
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '2rem' }}>
          <Checkbox
            checked={hasPlusOne}
            onChange={() => setHasPlusOne(!hasPlusOne)}
          />
          Has Plus One?
        </div>
        <ButtonContainer>
          <Button onClick={handleAddOrModifyGuest}>
            {currentGuest ? "Modify" : "Add"}
          </Button>
          <Button onClick={handleDeleteGuest}>Delete</Button>
        </ButtonContainer>

        {notification && <Notification>{notification}</Notification>}
        {currentGuest && (
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Subtitle level={3}>Named Partner:</Subtitle>
            <GuidedInput
              size="medium"
              value={pairValue}
              onChange={(e) => setPairValue(e.target.value)}
              suggestions={guests.map((guest) => guest.name)}
              setInputValue={setPairValue}
              placeholder="Name"
            />
            <Button onClick={handleAddOrRemovePartner}>
              {arePair ? 'Remove Partner' : 'Add Partner'}
            </Button>
          </div>
        )}
        <Subtitle level={2}>Current Tags:</Subtitle>
        {selectedGuestTags.length > 0 && (
          <TagContainer>
            {selectedGuestTags.map((tag, index) => (
              <StyledTag isOneInvite={false} key={index} onClick={() => handleRemoveTag(tag)}>
              {/* <StyledTag isOneInvite={sharedInviteNames.includes(tag.name)} key={index} onClick={() => handleRemoveTag(tag)}> */}
                {tag.name}
              </StyledTag>
            ))}
          </TagContainer>
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '1rem' }}>
          <Checkbox
            checked={oneInvite}
            onChange={() => setOneInvite(!oneInvite)}
          />
          Should people with this tag receive one invite?
        </div>

        <ButtonContainer>
          <Button onClick={handleAddNewTag}>Add Tag</Button>
        </ButtonContainer>
      </MenuContainer>

      <GuestList isHomePage={false}>

        <SelectorContainer>
          <DropdownSelector
            title="Filter by Tag"
            initialSelectedOption={filterByTag || "All"}
            options={allTags.map(tag => ({ label: tag, value: tag }))}
            onOptionSelect={(selectedOption) => {
              if (typeof selectedOption === 'string') {
                setFilterByTag(selectedOption);
              }
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
              if (typeof selectedOption === 'string') {
                setFilterByDecision(selectedOption);
              }
            }}
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
    </Container>
  );
};

export default GuestPage;
