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
import { translations } from "../translations";
import QuestionAnswerList from "../sections/GuestList/QuestionAnswerList";

const GuestPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [pairValue, setPairValue] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newTagWeight, setNewTagWeight] = useState('');
  const [selectedGuestTags, setSelectedGuestTags] = useState<Tag[]>([]);
  const [currentGuest, setCurrentGuest] = useState<Guest | undefined>(undefined);
  const [currentDecision, setCurrentDecision] = useState<Decision | undefined>(undefined);
  const [notification, setNotification] = useState<string>('');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [filterByTag, setFilterByTag] = useState<string>('all');
  const [filterByDecision, setFilterByDecision] = useState<string>('all');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [arePair, setArePair] = useState(false);
  const [invitationId, setInvitationId] = useState(-1);
  const FunctionsProxy = useFunctionsProxy();
  const { guests, tags, language, setGuests, setTags, invitations, couples, setCouples } = useUser();
  
  const possibleTags = tags.filter(tag => 
    !selectedGuestTags.some(selectedTag => selectedTag.id === tag.id)
  );
  
  const getPartner = (guestId: number) => {
    const couple = couples.find(couple => couple.guest1 === guestId || couple.guest2 === guestId);
  
    if (!couple) {
      return null;
    }
  
    const partnerId = couple.guest1 === guestId ? couple.guest2 : couple.guest1;
    return guests.find(guest => guest.id == partnerId);
  };

  useEffect(() => {
    const guest = guests.find(guest => guest.name.toLowerCase() === inputValue.toLowerCase());
    setCurrentGuest(guest);
    if (guest) {
      setSelectedGuestTags(tags.filter(tag => guest.tags.includes(tag.id)));
      setCurrentDecision(guest.decision);
      setHasPlusOne(guest.hasPlusOne);
      setInvitationId(guest.invitationId);
      const partner = getPartner(guest.id);
      if (partner)
        setPairValue(partner.name);

    } else {
      setSelectedGuestTags([]);
      setCurrentDecision(undefined);
      setInvitationId(-1);
      setHasPlusOne(false);
    }

  }, [inputValue, guests, couples]);

  useEffect(() => {
    if (currentGuest && pairExists(currentGuest.id))
      setArePair(true);
    else
      setArePair(false);
  }, [currentGuest, couples])

  const pairExists = (guestId: number): boolean => {
    return couples.some(couple => couple.guest1 === guestId || couple.guest2 === guestId);
  };

  const allDecisions = guests.map((guest) => guest.decision || 'not invited');
  const decisions = Array.from(new Set(allDecisions));

  const clearForm = () => {
    setInputValue('');
    setNewTag('');
    setNewTagWeight('');
    setSelectedGuestTags([]);
    setCurrentGuest(undefined);
    setCurrentDecision(undefined);
    setHasPlusOne(false);
  } 

  const handleNewTagWeightChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewTagWeight(value.replace(/\D/g, ''));
  };

  const handleRemoveTag = (tag: Tag) => {
    const updatedTags = selectedGuestTags.filter(existingTag => existingTag.id !== tag.id);
    setSelectedGuestTags(updatedTags);
  };

  const handleAddOrModifyGuest = async () => {
    const trimmedName = inputValue.trim();
    var updatedInvitationId = invitationId;
    if (trimmedName) {
      if (invitationId == -1) {
        const newInvitationId = await FunctionsProxy.newInvitation();
        setInvitationId(newInvitationId);
        updatedInvitationId = newInvitationId;
      }
    
      const existingGuest = guests.find(guest => guest.name.toLowerCase() === trimmedName.toLowerCase());
      if (existingGuest && currentDecision) {
        const updatedGuest = {
          ...existingGuest, 
          decision: currentDecision,
          tags: selectedGuestTags.map(tag => tag.id),
          invitationId: updatedInvitationId,
          hasPlusOne: hasPlusOne,
        };
        FunctionsProxy.updateGuest(updatedGuest);
        setGuests(guests.map(guest => guest.id != existingGuest.id? guest : updatedGuest));
        setNotification(translations[language].guestModified.replace("{name}", trimmedName));
      } else {
        const newGuestId = await FunctionsProxy.addGuest(trimmedName, selectedGuestTags.map(tag => tag.id), hasPlusOne, updatedInvitationId );
          setNotification(translations[language].guestAdded.replace("{name}", trimmedName));
          setGuests([...guests, {
              id: newGuestId,
              name: trimmedName,
              decision: "unknown",
              tags: selectedGuestTags.map(tag => tag.id),
              invitationId: updatedInvitationId,
              hasPlusOne: hasPlusOne
          }]);
        }
        setTimeout(() => {
          setNotification(""); 
          clearForm();
      }, 2000);
    } else {
      alert(translations[language].alertEmptyGuestName);
    }
  };

  const handleDeleteGuest = () => {
    if (currentGuest) {
      FunctionsProxy.removeGuest(currentGuest.id);
      setGuests(guests.filter(guest => guest.id != currentGuest.id))
      setNotification(translations[language].guestRemoved.replace("{name}", currentGuest.name));
      setTimeout(() => {
        setNotification(""); 
        clearForm();
      }, 2000);
    } else {
      alert(translations[language].alertSelectGuestToDelete);
    }
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddNewTag = async () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.some(tag => tag.name === trimmedTag)) {
      const newTagId = await FunctionsProxy.addTag(trimmedTag, Number(newTagWeight));

      setTags([...tags, {id: newTagId, name: trimmedTag, rank: Number(newTagWeight)}]);
      setNewTag('');
      setNewTagWeight('');
    } else {
      alert(translations[language].alertTagEmptyOrExists);
    }
  };

  const addTagToGuest = async (tag: Tag) => {
    const updatedTags = [...selectedGuestTags, tag];
    setSelectedGuestTags(updatedTags);
    if (currentGuest) {
      await FunctionsProxy.updateGuestTags(currentGuest.id, updatedTags.map(tag => tag.id));
    }
  };


  const addPair = async (guestId: number, partnerId: number) => {
    const pairId = await FunctionsProxy.addCouple(guestId, partnerId);
    setCouples([
      ...couples,
      { id: pairId, guest1: guestId, guest2: partnerId },
    ]);
  };

  const handleAddOrRemovePartner = async () => {
    if (currentGuest && pairValue) {
        const partner = guests.find(guest => guest.name.toLowerCase() === pairValue.toLowerCase());
        if (!partner) {
          const newGuestId = await FunctionsProxy.addGuest(pairValue, [], false, currentGuest.invitationId);
          setGuests([...guests, {
              id: newGuestId,
              name: pairValue,
              decision: "unknown",
              tags: [],
              invitationId: currentGuest.invitationId,
              hasPlusOne: false
          }]);

          await addPair(currentGuest.id, newGuestId);
        } else if (arePair) {
          await FunctionsProxy.removeGuest(partner.id);
          setGuests(guests.filter(guest => guest.id != partner.id));
          setCouples(couples.filter(couple => couple.guest1 != currentGuest.id && couple.guest2 != currentGuest.id));
          setPairValue('');
        } else {
          await addPair(currentGuest.id, partner.id);
        }
  
        setNotification(
          translations[language].addedPartner.replace("{name}", pairValue)
        );
      setTimeout(() => {
        setNotification(""); 
      }, 2000);
    } else {
      alert(translations[language].alertSelectGuestAndPartner);
    }
  };

  return (
    <>
    <Container>
      <MenuContainer >
        <Heading level={2}>{translations[language].manageGuests}</Heading>
        <SpaceBetweenContainer style={{ margin: 0, padding: 0 }}>
          {!currentGuest && <Subtitle level={3}>{translations[language].name}:</Subtitle>}
          {currentGuest && (
            <SelectorContainer>
              <DropdownSelector
                title={translations[language].decision}
                initialSelectedOption={currentGuest.decision}
                options={decisions.map((decision) => ({
                  label: translations[language][decision],
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
          placeholder={translations[language].name}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '2rem' }}>
          <Checkbox
            checked={hasPlusOne}
            onChange={() => setHasPlusOne(prev => !prev)}
          />
          {translations[language].hasPlusOne}
        </div>

        <DropdownSelector
          title={translations[language].invitation}
          initialSelectedOption={currentGuest ? currentGuest.invitationId.toString() : "new"}
          options={[
            ...invitations.map((invitation) => {
              const associatedGuests = guests
                .filter((guest) => guest.invitationId === invitation.id)
                .map((guest) => guest.name)
                .join(", ");
              return {
                label: `${invitation.id} (${associatedGuests || "No guests"})`,
                value: invitation.id.toString(),
              };
            }),
            ...(currentGuest
              ? [] 
              : [{ label: translations[language].newInvitation, value: "new" }]), 
          ]}
          onOptionSelect={(selectedOption) => setInvitationId(Number(selectedOption))}
        />

        <ButtonContainer>
          <Button onClick={handleAddOrModifyGuest}>
            {currentGuest ? translations[language].modify : translations[language].add}
          </Button>
          <Button onClick={handleDeleteGuest}>{translations[language].delete}</Button>
        </ButtonContainer>

        {notification && <Notification>{notification}</Notification>}
        {currentGuest && hasPlusOne && (
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Subtitle level={3}>{translations[language].namedPartner}:</Subtitle>
            <GuidedInput
              size="medium"
              value={pairValue}
              onChange={(e) => setPairValue(e.target.value)}
              suggestions={guests.map((guest) => guest.name)}
              setInputValue={setPairValue}
              placeholder={translations[language].name}
              disabled={arePair}
            />
            <Button onClick={handleAddOrRemovePartner}>
              {arePair ? translations[language].removePartner : translations[language].addPartner}
            </Button>
          </div>
        )}

        <Subtitle level={2}>{translations[language].currentTags}:</Subtitle>
        {selectedGuestTags.length > 0 && (
          <TagContainer>
            {selectedGuestTags.map((tag, index) => (
              <StyledTag isOneInvite={false} key={index} onClick={() => handleRemoveTag(tag)}>
                {tag.name}
              </StyledTag>
            ))}
          </TagContainer>
        )}
        {tags.length > 0 && (
          <>
            <Subtitle level={2}>{translations[language].addTags}:</Subtitle>
            <TagContainer>
              {possibleTags.map((tag, index) => (
                <StyledTag isOneInvite={false} key={index} onClick={() => addTagToGuest(tag)}>
                  {tag.name}
                </StyledTag>
              ))}
            </TagContainer>
          </>
        )}

        <Subtitle level={2}>{translations[language].createTag}:</Subtitle>
        <div style={{ margin: '0.5rem' }}>
          {translations[language].newTagName}
          <Input
            value={newTag}
            onChange={handleNewTagChange}
            placeholder={translations[language].newTagNamePlaceholder}
          />
        </div>
        <div style={{ margin: '0.5rem' }}>
          {translations[language].newTagWeight}
          <Input
            value={newTagWeight}
            onChange={handleNewTagWeightChange}
            placeholder={translations[language].newTagWeightPlaceholder}
            type="number"
          />
        </div>

        <ButtonContainer>
          <Button onClick={handleAddNewTag}>{translations[language].addTag}</Button>
        </ButtonContainer>
      </MenuContainer>

      <GuestList
        isHomePage={false}
        sortBy={sortBy}
        {...(filterByTag !== 'all' && { filterByTag })}
        {...(filterByDecision !== 'all' && { filterByDecision })}
      >

        <SelectorContainer>
          <DropdownSelector
            title={translations[language].filterByTag}
            initialSelectedOption={filterByTag}
            options={[
              { label: translations[language].all, value: "all" },
              ...tags.map(tag => ({ label: tag.name, value: tag.name }))
            ]}
            onOptionSelect={(selectedOption) => {
              if (typeof selectedOption === 'string') {
                setFilterByTag(selectedOption);
              }
            }}
          />
        </SelectorContainer>

        <SelectorContainer>
          <DropdownSelector
            title={translations[language].filterByDecision}
            initialSelectedOption={filterByDecision}
            options={[
              { label: translations[language].all, value: "all" },
              ...decisions.map(decision => ({
                label: translations[language][decision],
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
            title={translations[language].sort}
            initialSelectedOption={sortBy}
            options={[
              { label: translations[language].ascending, value: "asc" },
              { label: translations[language].descending, value: "desc" }
            ]}
            onOptionSelect={(selectedOption) => setSortBy(selectedOption as 'asc' | 'desc')}
          />
        </SelectorContainer>
      </GuestList>
    </Container>
    <QuestionAnswerList/>
    </>
  );
};

export default GuestPage;
