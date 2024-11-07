import { MockedProvider } from '@apollo/client/testing';

import SharedRoleGuard from '@dc/shared/RoleGuard/RoleGuard';
import { renderWithReduxProvider } from '@dc/utils/test';
import { ROLES } from '@dc/resources/constants';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';

const renderRoleGuard = (children) =>
  renderWithReduxProvider(<MockedProvider mocks={[]}>{children}</MockedProvider>, {
    initialState: {
      session: {
        user: { type: 'user' },
      },
    },
  });

describe('SharedRoleGuard', () => {
  describe('SystemAdmin', () => {
    it('allows to see content for system admin role', () => {
      const systemAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SYSTEM_ADMIN } }}>
          <SharedRoleGuard.SystemAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SystemAdmin>
        </UserInfoProvider>
      );

      expect(systemAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('does not allow to see content for sales admin role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SALES_ADMIN } }}>
          <SharedRoleGuard.SystemAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SystemAdmin>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('does not allow to see content for entity admin role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.ENTITY_ADMIN } }}>
          <SharedRoleGuard.SystemAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SystemAdmin>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('does not allow to see content for teacher role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.TEACHER_ADMIN } }}>
          <SharedRoleGuard.SystemAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SystemAdmin>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('SalesAdmin', () => {
    it('allows to see content for system admin role', () => {
      const salesAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SYSTEM_ADMIN } }}>
          <SharedRoleGuard.SalesAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SalesAdmin>
        </UserInfoProvider>
      );

      expect(salesAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('allows to see content for sales admin role', () => {
      const salesAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SALES_ADMIN } }}>
          <SharedRoleGuard.SalesAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SalesAdmin>
        </UserInfoProvider>
      );

      expect(salesAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('does not allow to see content for entity admin role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.ENTITY_ADMIN } }}>
          <SharedRoleGuard.SalesAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SalesAdmin>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    it('does not allow to see content for teacher role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.TEACHER_ADMIN } }}>
          <SharedRoleGuard.SalesAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.SalesAdmin>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('EntityAdmin', () => {
    it('allows to see content for system admin role', () => {
      const systemAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SYSTEM_ADMIN } }}>
          <SharedRoleGuard.EntityAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.EntityAdmin>
        </UserInfoProvider>
      );

      expect(systemAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('allows to see content for sales admin role', () => {
      const systemAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SALES_ADMIN } }}>
          <SharedRoleGuard.EntityAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.EntityAdmin>
        </UserInfoProvider>
      );

      expect(systemAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('allows to see content for entity admin role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.ENTITY_ADMIN } }}>
          <SharedRoleGuard.EntityAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.EntityAdmin>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('does not allow to see content for teacher role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.TEACHER_ADMIN } }}>
          <SharedRoleGuard.EntityAdmin>
            <div data-testid='protected-content' />
          </SharedRoleGuard.EntityAdmin>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('Teacher', () => {
    it('allows to see content for system admin role', () => {
      const systemAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SYSTEM_ADMIN } }}>
          <SharedRoleGuard.Teacher>
            <div data-testid='protected-content' />
          </SharedRoleGuard.Teacher>
        </UserInfoProvider>
      );

      expect(systemAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('allows to see content for sales admin role', () => {
      const systemAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.SALES_ADMIN } }}>
          <SharedRoleGuard.Teacher>
            <div data-testid='protected-content' />
          </SharedRoleGuard.Teacher>
        </UserInfoProvider>
      );

      expect(systemAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('allows to see content for entity admin role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.ENTITY_ADMIN } }}>
          <SharedRoleGuard.Teacher>
            <div data-testid='protected-content' />
          </SharedRoleGuard.Teacher>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });

    it('allows to see content for teacher role', () => {
      const entityAdminUtils = renderRoleGuard(
        <UserInfoProvider value={{ userInfo: { role: ROLES.TEACHER } }}>
          <SharedRoleGuard.Teacher>
            <div data-testid='protected-content' />
          </SharedRoleGuard.Teacher>
        </UserInfoProvider>
      );

      expect(entityAdminUtils.queryByTestId('protected-content')).toBeInTheDocument();
    });
  });
});
