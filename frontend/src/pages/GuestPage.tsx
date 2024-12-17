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
import useFunctionsProxy from "../FunctionHandler";
import DropdownSelector from "../components/ui/Dropdown/Dropdown";
import Checkbox from "../components/ui/Checkbox";
import { useUser } from "../providers/UserContext";

const GuestPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [pairValue, setPairValue] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedGuestTags, setSelectedGuestTags] = useState<string[]>([]);
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
  const sharedInviteNames: string[] = FunctionsProxy.getAllSharedInviteNames();
  const {guests} = useUser();

  const getPartner = (guestName: string): string | null => {
    const pair = pairs.find((pair) => pair.guest === guestName);
    return pair ? pair.partner : null;
  };


  useEffect(() => {
    const guest = guests.find(guest => guest.name.toLowerCase() === inputValue.toLowerCase());
    setCurrentGuest(guest);
    if (guest) {
      setSelectedGuestTags(guest.tags);
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

  const allDecisions = guests.map((guest) => guest.decision || 'not invited');
  const decisions = Array.from(new Set(allDecisions));

  const handleNewTagWeightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewTagWeight(value.replace(/\D/g, ''));
  };

  const handleDecisionChange = (guestId: number, decision: 'yes' | 'no') => {
    FunctionsProxy.handleDecision(guestId, decision);
  };

  const handleInviteChange = (guestName: string) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.name === guestName ? { ...guest, decision: 'unknown' } : guest
      )
    );
    FunctionsProxy.handleInvite(guestName);
  };

  const possibleTags = allTags.filter(tag => !selectedGuestTags.includes(tag));

  const handleAddTag = (tag: string) => {
    const weight = Number(newTagWeight);
    const updatedTags = [...selectedGuestTags, tag];
    setSelectedGuestTags(updatedTags);
    if (currentGuest) {
      updateGuestTags(currentGuest.name, updatedTags);
      updateTags(tag, weight, oneInvite);
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
            guest.name === trimmedName ? { ...guest, tags: selectedGuestTags, decision: currentDecision, hasPlusOne } : guest
          )
        );
        FunctionsProxy.updateGuestTags(trimmedName, selectedGuestTags);
        setNotification(`Modified: ${trimmedName}`);
      } else {
        const newGuest: Guest = { name: trimmedName, tags: selectedGuestTags, decision: currentDecision || 'not invited', hasPlusOne };
        setGuests(prevGuests => [...prevGuests, newGuest]);
        FunctionsProxy.addGuest(trimmedName, 42);
        setNotification(`Added: ${trimmedName}`);
      }
    } else {
      alert("Guest name cannot be empty!");
    }
  };

  const handleDeleteGuest = () => {
    if (currentGuest) {
      setGuests(prevGuests => prevGuests.filter(guest => guest.name !== currentGuest.name));
      FunctionsProxy.removeGuest(currentGuest.name);
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

  const sortedGuests = [...guests].sort((a, b) => {
    if (sortBy === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const filteredGuests = sortedGuests.filter(guest => {
    const tagMatch = filterByTag === '' || guest.tags.includes(filterByTag);
    const decisionMatch = filterByDecision === 'all' || guest.decision.toLowerCase() === filterByDecision.toLowerCase();
    return tagMatch && decisionMatch;
  });

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
              <Tag isOneInvite={sharedInviteNames.includes(tag)} key={index} onClick={() => handleRemoveTag(tag)}>
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
                <Tag isOneInvite={sharedInviteNames.includes(tag)} key={index} onClick={() => handleAddTag(tag)}>
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

      <GuestList isHomePage={false} handleDecision={handleDecisionChange} handleInvite={handleInviteChange}>

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
